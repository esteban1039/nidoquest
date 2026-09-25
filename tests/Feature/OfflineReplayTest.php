<?php

namespace Tests\Feature;

use App\Models\Explorer;
use App\Models\GrowthArea;
use App\Models\Mission;
use App\Models\MissionSubmission;
use App\Models\Reward;
use App\Models\RewardRedemption;
use App\Models\Subscription;
use App\Models\Tenant;
use App\Models\User;
use App\Services\BadgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class OfflineReplayTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array{0: Tenant, 1: User, 2: Explorer}
     */
    private function makeContext(): array
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

        $explorer = Explorer::factory()->create(['tenant_id' => $tenant->id]);

        return [$tenant, $guide, $explorer];
    }

    private function pendingMissionFor(Tenant $tenant, Explorer $explorer, int $stars = 10): Mission
    {
        return Mission::factory()->create([
            'tenant_id' => $tenant->id,
            'explorer_id' => $explorer->id,
            'growth_area_id' => GrowthArea::create([
                'tenant_id' => $tenant->id,
                'name' => 'Estudio',
                'slug' => 'estudio-'.Str::lower(Str::random(4)),
                'color' => '#79C7C5',
                'active' => true,
            ])->id,
            'stars' => $stars,
            'status' => 'pending',
        ]);
    }

    public function test_reintento_submit_no_duplica(): void
    {
        [$tenant, $guide, $explorer] = $this->makeContext();
        $mission = $this->pendingMissionFor($tenant, $explorer);
        $headers = ['X-Tenant-ID' => $tenant->id];
        $body = ['client_mutation_id' => 'mision-1-reintento'];

        $this->actingAs($guide)->postJson("/api/missions/{$mission->id}/submit", $body, $headers)->assertCreated();
        $this->actingAs($guide)
            ->postJson("/api/missions/{$mission->id}/submit", $body, $headers)
            ->assertOk()
            ->assertJsonPath('duplicate', true);

        $this->assertSame(1, MissionSubmission::query()
            ->where('mission_id', $mission->id)
            ->where('client_mutation_id', 'mision-1-reintento')
            ->count());
    }

    public function test_submit_sin_mutacion_sigue_igual(): void
    {
        [$tenant, $guide, $explorer] = $this->makeContext();
        $mission = $this->pendingMissionFor($tenant, $explorer);

        $this->actingAs($guide)
            ->postJson("/api/missions/{$mission->id}/submit", [], ['X-Tenant-ID' => $tenant->id])
            ->assertCreated()
            ->assertJsonMissingPath('duplicate');
    }

    public function test_reintento_redeem_no_duplica(): void
    {
        [$tenant, $guide, $explorer] = $this->makeContext();
        $mission = $this->pendingMissionFor($tenant, $explorer, 20);
        $reward = Reward::factory()->create(['tenant_id' => $tenant->id, 'stars_cost' => 5]);
        $headers = ['X-Tenant-ID' => $tenant->id];

        $this->actingAs($guide)->postJson("/api/missions/{$mission->id}/submit", [], $headers)->assertCreated();
        $this->actingAs($guide)->postJson("/api/missions/{$mission->id}/approve", [], $headers)->assertOk();

        $body = ['explorer_id' => $explorer->id, 'client_mutation_id' => 'redeem-1-reintento'];
        $this->actingAs($guide)->postJson("/api/rewards/{$reward->id}/redeem", $body, $headers)->assertCreated();
        $this->actingAs($guide)->postJson("/api/rewards/{$reward->id}/redeem", $body, $headers)->assertOk();

        $this->assertSame(1, RewardRedemption::query()
            ->where('reward_id', $reward->id)
            ->where('explorer_id', $explorer->id)
            ->where('client_mutation_id', 'redeem-1-reintento')
            ->count());
    }
}
