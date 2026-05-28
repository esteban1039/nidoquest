<?php

namespace Database\Seeders;

use App\Models\Explorer;
use App\Models\GrowthArea;
use App\Models\Mission;
use App\Models\Reward;
use App\Models\Subscription;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin NidoQuest',
            'email' => 'admin@nidoquest.test',
            'role' => User::ROLE_SUPER_ADMIN,
        ]);

        $guide = User::factory()->create([
            'name' => 'Guía Demo',
            'email' => 'guia@nidoquest.test',
            'role' => User::ROLE_GUIDE,
        ]);

        $tenant = Tenant::factory()->create([
            'name' => 'Nido Demo',
            'slug' => 'nido-demo',
            'owner_id' => $guide->id,
        ]);

        $tenant->users()->attach($guide->id, ['role' => User::ROLE_GUIDE]);

        $areas = collect([
            'Estudio',
            'Hogar',
            'Deporte',
            'Bienestar',
            'Lectura',
            'Orden',
            'Responsabilidad',
            'Colaboración',
            'Creatividad',
        ])->map(fn (string $name) => GrowthArea::create([
            'tenant_id' => $tenant->id,
            'name' => $name,
            'slug' => Str::slug($name),
            'color' => '#79C7C5',
            'active' => true,
        ]));

        $explorer = Explorer::factory()->create([
            'tenant_id' => $tenant->id,
            'guide_id' => $guide->id,
            'name' => 'Exploradora Demo',
        ]);

        Mission::factory()->count(5)->create([
            'tenant_id' => $tenant->id,
            'explorer_id' => $explorer->id,
            'growth_area_id' => $areas->first()->id,
        ]);

        Reward::factory()->count(4)->create([
            'tenant_id' => $tenant->id,
        ]);

        Subscription::create([
            'tenant_id' => $tenant->id,
            'plan' => 'annual',
            'status' => 'trial',
            'price_cents' => 15000000,
            'currency' => 'COP',
            'trial_ends_at' => now()->addDays(14),
        ]);
    }
}
