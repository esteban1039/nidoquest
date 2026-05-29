<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Explorer;
use App\Models\Mission;
use App\Models\MissionSubmission;
use App\Models\RewardRedemption;
use App\Models\Tenant;
use App\Services\StarService;
use App\Services\TenantContext;

class DashboardController extends Controller
{
    public function guide(TenantContext $tenantContext)
    {
        $tenantId = $tenantContext->id();

        return response()->json([
            'stars_by_explorer' => Explorer::forTenant($tenantId)->get()->map(fn (Explorer $explorer) => [
                'explorer_id' => $explorer->id,
                'name' => $explorer->name,
                'stars' => $explorer->availableStars(),
            ]),
            'pending_missions' => Mission::forTenant($tenantId)->where('status', 'pending')->count(),
            'submitted_missions' => Mission::forTenant($tenantId)->where('status', 'submitted')->count(),
            'completed_missions' => MissionSubmission::forTenant($tenantId)->where('status', 'approved')->count(),
            'expired_missions' => Mission::forTenant($tenantId)->where('status', 'expired')->count(),
            'requested_rewards' => RewardRedemption::forTenant($tenantId)->where('status', 'requested')->count(),
            'weekly_progress' => MissionSubmission::forTenant($tenantId)->where('reviewed_at', '>=', now()->subWeek())->where('status', 'approved')->count(),
            'consistency_indicator' => Mission::forTenant($tenantId)->where('created_at', '>=', now()->subWeek())->count(),
        ]);
    }

    public function explorer(Explorer $explorer, StarService $stars)
    {
        $this->authorize('view', $explorer);

        return response()->json([
            'available_stars' => $stars->balance($explorer),
            'today_missions' => $explorer->missions()
                ->where('active', true)
                ->whereIn('status', ['pending', 'rejected'])
                ->where(function ($query): void {
                    $query->whereNull('due_date')
                        ->orWhereDate('due_date', '<=', today());
                })
                ->latest()
                ->get(),
            'weekly_progress' => MissionSubmission::query()
                ->where('explorer_id', $explorer->id)
                ->where('reviewed_at', '>=', now()->subWeek())
                ->where('status', 'approved')
                ->count(),
            'available_rewards' => $explorer->tenant->rewards()->where('active', true)->get(),
            'badges' => $explorer->badges,
            'daily_message' => 'Cada paso cuenta. Hoy puedes avanzar con calma y constancia.',
        ]);
    }

    public function admin()
    {
        abort_unless(request()->user()->isSuperAdmin(), 403);

        $tenants = Tenant::with('owner')
            ->withCount(['explorers', 'missions', 'rewards'])
            ->latest()
            ->get()
            ->map(fn (Tenant $tenant) => [
                'id' => $tenant->id,
                'name' => $tenant->name,
                'status' => $tenant->status,
                'owner_name' => $tenant->owner?->name,
                'owner_email' => $tenant->owner?->email,
                'owner_last_login_at' => $tenant->owner?->last_login_at,
                'explorers_count' => $tenant->explorers_count,
                'missions_count' => $tenant->missions_count,
                'rewards_count' => $tenant->rewards_count,
                'created_at' => $tenant->created_at,
            ]);

        return response()->json([
            'tenants' => Tenant::count(),
            'active_tenants' => Tenant::where('status', 'active')->count(),
            'trial_tenants' => Tenant::where('status', 'trial')->count(),
            'explorers' => Explorer::count(),
            'missions' => Mission::count(),
            'missions_approved' => MissionSubmission::where('status', 'approved')->count(),
            'tenant_rows' => $tenants,
        ]);
    }
}
