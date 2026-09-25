<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Explorer;
use App\Models\Mission;
use App\Models\MissionSubmission;
use App\Models\RewardRedemption;
use App\Models\Setting;
use App\Models\StarMovement;
use App\Models\Tenant;
use App\Services\GamificationService;
use App\Services\StarService;
use App\Services\TenantContext;

class DashboardController extends Controller
{
    public function guide(TenantContext $tenantContext, GamificationService $gamification)
    {
        $tenantId = $tenantContext->id();

        $approvedThisWeek = MissionSubmission::forTenant($tenantId)
            ->where('status', 'approved')
            ->where('reviewed_at', '>=', now()->subWeek());

        $starsEarnedThisWeek = StarMovement::forTenant($tenantId)
            ->where('type', StarMovement::EARNED)
            ->where('created_at', '>=', now()->subWeek())
            ->sum('amount');

        $familyGoal = (int) (Setting::forTenant($tenantId)->where('key', 'family_weekly_goal')->first()?->value['stars'] ?? 0);

        $explorers = Explorer::forTenant($tenantId)->get();
        $totalStarsBalance = $explorers->sum(fn (Explorer $e) => $e->availableStars());

        // 7-day daily activity breakdown
        $dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        $dailyActivity = [];
        for ($i = 6; $i >= 0; $i--) {
            $dayCarbon = now()->subDays($i);
            $dateStr = $dayCarbon->toDateString();
            $dayOfWeek = $dayCarbon->dayOfWeek;

            $missionsCount = MissionSubmission::forTenant($tenantId)
                ->where('status', 'approved')
                ->whereDate('reviewed_at', $dateStr)
                ->count();

            $starsCount = (int) StarMovement::forTenant($tenantId)
                ->where('type', StarMovement::EARNED)
                ->whereDate('created_at', $dateStr)
                ->sum('amount');

            $dailyActivity[] = [
                'day' => $dayNames[$dayOfWeek],
                'date' => $dateStr,
                'is_today' => $i === 0,
                'missions_count' => $missionsCount,
                'stars_count' => $starsCount,
            ];
        }

        $allSubmissionsCount = MissionSubmission::forTenant($tenantId)->count();
        $approvedSubmissionsCount = MissionSubmission::forTenant($tenantId)->where('status', 'approved')->count();
        $completionRate = $allSubmissionsCount > 0 ? (int) round(($approvedSubmissionsCount / $allSubmissionsCount) * 100) : 100;

        return response()->json([
            'stars_by_explorer' => $explorers->map(function (Explorer $explorer) use ($gamification) {
                $streak = $gamification->calculateStreak($explorer);
                return [
                    'explorer_id' => $explorer->id,
                    'name' => $explorer->name,
                    'stars' => $explorer->availableStars(),
                    'streak' => $streak['count'],
                    'streak_active_today' => $streak['is_active_today'],
                    'status' => $explorer->status ?? 'active',
                    'age_group' => $explorer->age_group,
                ];
            }),
            'total_stars_balance' => (int) $totalStarsBalance,
            'completion_rate' => $completionRate,
            'daily_activity' => $dailyActivity,
            'pending_missions' => Mission::forTenant($tenantId)->where('status', 'pending')->count(),
            'submitted_missions' => Mission::forTenant($tenantId)->where('status', 'submitted')->count(),
            'completed_missions' => MissionSubmission::forTenant($tenantId)->where('status', 'approved')->count(),
            'expired_missions' => Mission::forTenant($tenantId)->where('status', 'expired')->count(),
            'requested_rewards' => RewardRedemption::forTenant($tenantId)->where('status', 'requested')->count(),
            'weekly_progress' => (clone $approvedThisWeek)->count(),
            'consistency_indicator' => (clone $approvedThisWeek)->selectRaw('COUNT(DISTINCT DATE(reviewed_at)) as days')->value('days') ?? 0,
            'household' => [
                'explorers_active' => Explorer::forTenant($tenantId)->where('status', 'active')->count(),
                'approvals_last_7_days' => (clone $approvedThisWeek)->count(),
                'stars_earned_last_7_days' => (int) $starsEarnedThisWeek,
                'family_weekly_goal' => $familyGoal > 0 ? $familyGoal : null,
                'family_goal_progress' => $familyGoal > 0 ? min(100, (int) round($starsEarnedThisWeek / $familyGoal * 100)) : null,
            ],
        ]);
    }

    public function explorer(Explorer $explorer, StarService $stars, GamificationService $gamification)
    {
        $this->authorize('view', $explorer);

        $availableStars = $stars->balance($explorer);
        $reservedStars = RewardRedemption::query()
            ->where('explorer_id', $explorer->id)
            ->where('status', 'requested')
            ->sum('stars_cost');
        $redeemableStars = max(0, $availableStars - $reservedStars);
        $gamificationProfile = $gamification->getProfile($explorer);

        return response()->json([
            'available_stars' => $availableStars,
            'reserved_stars' => $reservedStars,
            'redeemable_stars' => $redeemableStars,
            'streak' => $gamificationProfile['streak'],
            'daily_spin' => $gamificationProfile['daily_spin'],
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
            'available_rewards' => $explorer->tenant->rewards()
                ->where('active', true)
                ->get()
                ->map(fn ($reward) => [
                    'id' => $reward->id,
                    'name' => $reward->name,
                    'description' => $reward->description,
                    'stars_cost' => $reward->stars_cost,
                    'type' => $reward->type,
                    'can_redeem' => $redeemableStars >= $reward->stars_cost,
                ]),
            'reward_redemptions' => $explorer->rewardRedemptions()
                ->with('reward')
                ->latest()
                ->limit(10)
                ->get()
                ->map(fn (RewardRedemption $redemption) => [
                    'id' => $redemption->id,
                    'reward_name' => $redemption->reward?->name,
                    'status' => $redemption->status,
                    'stars_cost' => $redemption->stars_cost,
                    'created_at' => $redemption->created_at,
                    'approved_at' => $redemption->approved_at,
                    'delivered_at' => $redemption->delivered_at,
                ]),
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
