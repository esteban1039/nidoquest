<?php

namespace Tests\Feature;

use App\Models\Explorer;
use App\Models\GrowthArea;
use App\Models\Mission;
use App\Models\MissionSubmission;
use App\Models\Reward;
use App\Models\Subscription;
use App\Models\Tenant;
use App\Models\User;
use App\Services\BadgeService;
use Illuminate\Support\Str;
use Tests\TestCase;

class FamilyProgressTest extends TestCase
{
    /**
     * @return array{0: Tenant, 1: User}
     */
    private function guideContext(): array
    {
        $tenant = Tenant::factory()->create();
        $guide = User::factory()->create(['role' => User::ROLE_GUIDE]);
        $tenant->users()->attach($guide->id, ['role' => User::ROLE_GUIDE]);
        Subscription::create([
            'tenant_id' => $tenant->id,
            'plan' => 'annual',
            'status' => 'trial',
            'price_cents' => 15000000,
            'currency' => 'COP',
            'trial_ends_at' => now()->addDays(14),
        ]);

        app(BadgeService::class)->ensureStarterBadges($tenant);

        return [$tenant, $guide];
    }

    private function explorerFor(Tenant $tenant, ?string $birthdate = null): Explorer
    {
        return Explorer::factory()->create([
            'tenant_id' => $tenant->id,
            'birthdate' => $birthdate,
        ]);
    }

    private function growthAreaFor(Tenant $tenant): GrowthArea
    {
        return GrowthArea::create([
            'tenant_id' => $tenant->id,
            'name' => 'Estudio',
            'slug' => 'estudio-'.Str::lower(Str::random(4)),
            'color' => '#79C7C5',
            'active' => true,
        ]);
    }

    private function submittedMissionFor(Tenant $tenant, Explorer $explorer): Mission
    {
        return Mission::factory()->create([
            'tenant_id' => $tenant->id,
            'explorer_id' => $explorer->id,
            'growth_area_id' => $this->growthAreaFor($tenant)->id,
            'status' => 'submitted',
        ]);
    }

    public function test_grupos_de_edad_y_sugerencias(): void
    {
        [$tenant] = $this->guideContext();

        $peques = $this->explorerFor($tenant, now()->subYears(7)->toDateString());
        $medios = $this->explorerFor($tenant, now()->subYears(10)->toDateString());
        $jovenes = $this->explorerFor($tenant, now()->subYears(15)->toDateString());
        $sinEdad = $this->explorerFor($tenant, null);

        $this->assertSame('peques', $peques->ageGroup());
        $this->assertSame(['difficulty' => 'easy', 'stars_min' => 3, 'stars_max' => 8], $peques->missionGuidance());
        $this->assertSame('medios', $medios->ageGroup());
        $this->assertSame('jovenes', $jovenes->ageGroup());
        $this->assertNull($sinEdad->ageGroup());
        $this->assertNull($sinEdad->missionGuidance());
    }

    public function test_recurso_explorador_incluye_edad(): void
    {
        [$tenant, $guide] = $this->guideContext();
        $explorer = $this->explorerFor($tenant, now()->subYears(6)->toDateString());

        $response = $this->actingAs($guide)->getJson("/api/explorers/{$explorer->id}", ['X-Tenant-ID' => $tenant->id]);

        $response->assertOk();
        $response->assertJsonPath('data.age_group', 'peques');
        $response->assertJsonPath('data.mission_guidance.difficulty', 'easy');
    }

    public function test_constancia_mide_dias_distintos(): void
    {
        [$tenant, $guide] = $this->guideContext();
        $explorer = $this->explorerFor($tenant);
        $mission = $this->submittedMissionFor($tenant, $explorer);

        foreach ([0, 2, 5] as $daysAgo) {
            MissionSubmission::create([
                'tenant_id' => $tenant->id,
                'mission_id' => $mission->id,
                'explorer_id' => $explorer->id,
                'status' => 'approved',
                'submitted_at' => now()->subDays($daysAgo),
                'reviewed_at' => now()->subDays($daysAgo),
            ]);
        }

        $response = $this->actingAs($guide)->getJson('/api/dashboard/guide', ['X-Tenant-ID' => $tenant->id]);

        $response->assertOk();
        $response->assertJsonPath('consistency_indicator', 3);
    }

    public function test_primera_mision_otorga_insignia_una_sola_vez(): void
    {
        [$tenant, $guide] = $this->guideContext();
        $explorer = $this->explorerFor($tenant);

        $headers = ['X-Tenant-ID' => $tenant->id];
        $this->actingAs($guide)->postJson("/api/missions/{$this->submittedMissionFor($tenant, $explorer)->id}/approve", [], $headers)->assertOk();
        $this->actingAs($guide)->postJson("/api/missions/{$this->submittedMissionFor($tenant, $explorer)->id}/approve", [], $headers)->assertOk();

        $this->assertTrue($explorer->badges()->where('name', 'Primera misión')->exists());
        $this->assertSame(1, $explorer->badges()->where('name', 'Primera misión')->count());
    }

    public function test_racha_de_3_dias_otorga_insignia(): void
    {
        [$tenant, $guide] = $this->guideContext();
        $explorer = $this->explorerFor($tenant);
        $mission = $this->submittedMissionFor($tenant, $explorer);

        foreach ([1, 2, 3] as $daysAgo) {
            MissionSubmission::create([
                'tenant_id' => $tenant->id,
                'mission_id' => $mission->id,
                'explorer_id' => $explorer->id,
                'status' => 'approved',
                'submitted_at' => now()->subDays($daysAgo),
                'reviewed_at' => now()->subDays($daysAgo),
            ]);
        }

        $this->actingAs($guide)
            ->postJson("/api/missions/{$this->submittedMissionFor($tenant, $explorer)->id}/approve", [], ['X-Tenant-ID' => $tenant->id])
            ->assertOk();

        $this->assertTrue($explorer->badges()->where('name', 'Racha de 3 días')->exists());
    }

    public function test_meta_familiar_y_bloque_hogar(): void
    {
        [$tenant, $guide] = $this->guideContext();
        $headers = ['X-Tenant-ID' => $tenant->id];

        $this->actingAs($guide)
            ->putJson("/api/nests/{$tenant->id}/family-goal", ['stars' => 60], $headers)
            ->assertOk()
            ->assertJsonPath('family_weekly_goal', 60);

        $response = $this->actingAs($guide)->getJson('/api/dashboard/guide', $headers);

        $response->assertOk();
        $response->assertJsonPath('household.family_weekly_goal', 60);
        $response->assertJsonPath('household.family_goal_progress', 0);
    }

    public function test_redencion_aprobada_otorga_meta_alcanzada(): void
    {
        [$tenant, $guide] = $this->guideContext();
        $explorer = $this->explorerFor($tenant);
        $reward = Reward::factory()->create(['tenant_id' => $tenant->id, 'stars_cost' => 5]);
        $headers = ['X-Tenant-ID' => $tenant->id];

        $mission = $this->submittedMissionFor($tenant, $explorer);
        $mission->update(['stars' => 20]);

        $this->actingAs($guide)
            ->postJson("/api/missions/{$mission->id}/approve", [], $headers)
            ->assertOk();

        $redemptionId = $this->actingAs($guide)
            ->postJson("/api/rewards/{$reward->id}/redeem", ['explorer_id' => $explorer->id], $headers)
            ->assertCreated()
            ->json('data.id');

        $this->actingAs($guide)
            ->postJson("/api/reward-redemptions/{$redemptionId}/approve", [], $headers)
            ->assertOk();

        $this->assertTrue($explorer->badges()->where('name', 'Meta alcanzada')->exists());
    }
}
