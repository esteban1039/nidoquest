<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExplorerResource;
use App\Http\Resources\MissionResource;
use App\Http\Resources\RewardResource;
use App\Models\Explorer;
use App\Models\GrowthArea;
use App\Models\Mission;
use App\Models\Reward;
use App\Services\TenantContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OnboardingController extends Controller
{
    public function store(Request $request, TenantContext $tenantContext): JsonResponse
    {
        $data = $request->validate([
            'nest' => ['required', 'string', 'max:255'],
            'explorer' => ['required', 'string', 'max:255'],
            'area' => ['required', 'string', 'max:120'],
            'mission' => ['required', 'string', 'max:255'],
        ]);

        $tenant = $tenantContext->get();

        abort_unless($tenant, 403);

        $result = DB::transaction(function () use ($data, $tenant, $request) {
            $tenant->update(['name' => $data['nest']]);

            $growthArea = GrowthArea::firstOrCreate(
                ['tenant_id' => $tenant->id, 'slug' => Str::slug($data['area'])],
                ['name' => $data['area'], 'color' => '#79C7C5', 'active' => true],
            );

            $explorer = Explorer::create([
                'tenant_id' => $tenant->id,
                'guide_id' => $request->user()->id,
                'name' => $data['explorer'],
                'status' => 'active',
            ]);

            $mission = Mission::create([
                'tenant_id' => $tenant->id,
                'growth_area_id' => $growthArea->id,
                'explorer_id' => $explorer->id,
                'title' => $data['mission'],
                'stars' => 5,
                'frequency' => 'daily',
                'evidence_required' => false,
                'evidence_type' => 'none',
                'difficulty' => 'easy',
                'status' => 'pending',
                'active' => true,
            ]);

            $reward = Reward::create([
                'tenant_id' => $tenant->id,
                'name' => 'Plan familiar especial',
                'description' => 'Primera recompensa para motivar el avance.',
                'stars_cost' => 25,
                'category' => 'familia',
                'type' => 'family',
                'requires_approval' => true,
                'active' => true,
            ]);

            return compact('explorer', 'mission', 'reward');
        });

        return response()->json([
            'explorer' => ExplorerResource::make($result['explorer']),
            'mission' => MissionResource::make($result['mission']),
            'reward' => RewardResource::make($result['reward']),
        ], 201);
    }
}
