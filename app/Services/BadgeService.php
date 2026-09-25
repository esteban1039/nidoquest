<?php

namespace App\Services;

use App\Models\Badge;
use App\Models\Explorer;
use App\Models\MissionSubmission;
use App\Models\Tenant;

class BadgeService
{
    public const FIRST_MISSION = 'first_mission';

    public const STREAK_3 = 'streak_3';

    public const FIRST_GOAL = 'first_goal';

    /**
     * @return array<string, array{name: string, description: string}>
     */
    public static function starterBadges(): array
    {
        return [
            self::FIRST_MISSION => [
                'name' => 'Primera misión',
                'description' => 'Completó su primera misión aprobada.',
            ],
            self::STREAK_3 => [
                'name' => 'Racha de 3 días',
                'description' => 'Avanzó 3 días distintos con misiones aprobadas.',
            ],
            self::FIRST_GOAL => [
                'name' => 'Meta alcanzada',
                'description' => 'Alcanzó su primera recompensa aprobada.',
            ],
        ];
    }

    public function ensureStarterBadges(Tenant $tenant): void
    {
        foreach (self::starterBadges() as $key => $badge) {
            Badge::firstOrCreate(
                ['tenant_id' => $tenant->id, 'name' => $badge['name']],
                [
                    'description' => $badge['description'],
                    'criteria' => ['key' => $key],
                    'active' => true,
                ]
            );
        }
    }

    public function grantForApproval(Explorer $explorer): void
    {
        $this->grant($explorer, self::FIRST_MISSION);

        if ($this->approvalDays($explorer) >= 3) {
            $this->grant($explorer, self::STREAK_3);
        }
    }

    public function grantForRedemption(Explorer $explorer): void
    {
        $this->grant($explorer, self::FIRST_GOAL);
    }

    private function grant(Explorer $explorer, string $key): void
    {
        $name = self::starterBadges()[$key]['name'] ?? null;

        if ($name === null) {
            return;
        }

        $badge = Badge::query()
            ->where('tenant_id', $explorer->tenant_id)
            ->where('name', $name)
            ->first();

        if (! $badge || $explorer->badges()->where('badge_id', $badge->id)->exists()) {
            return;
        }

        $explorer->badges()->attach($badge->id, ['tenant_id' => $explorer->tenant_id, 'earned_at' => now()]);
    }

    private function approvalDays(Explorer $explorer): int
    {
        return (int) MissionSubmission::query()
            ->where('explorer_id', $explorer->id)
            ->where('status', 'approved')
            ->selectRaw('COUNT(DISTINCT DATE(reviewed_at)) as days')
            ->value('days');
    }
}
