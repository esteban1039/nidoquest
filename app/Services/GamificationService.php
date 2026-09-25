<?php

namespace App\Services;

use App\Models\Explorer;
use App\Models\MissionSubmission;
use App\Models\StarMovement;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class GamificationService
{
    public function __construct(
        protected StarService $stars
    ) {}

    /**
     * Get the full gamification profile for an explorer.
     */
    public function getProfile(Explorer $explorer): array
    {
        $streak = $this->calculateStreak($explorer);
        $dailySpin = $this->getDailySpinStatus($explorer);

        return [
            'streak' => $streak,
            'daily_spin' => $dailySpin,
        ];
    }

    /**
     * Calculate streak status for an explorer.
     */
    public function calculateStreak(Explorer $explorer): array
    {
        $prefs = $explorer->preferences ?? [];
        $shields = (int) ($prefs['streak_shields'] ?? 1); // Start with 1 free shield
        $manualStreak = (int) ($prefs['streak_count'] ?? 0);
        $lastActivityDateStr = $prefs['streak_last_date'] ?? null;

        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        // Check recent approved or submitted missions
        $latestSubmission = MissionSubmission::query()
            ->where('explorer_id', $explorer->id)
            ->whereIn('status', ['approved', 'submitted'])
            ->latest('submitted_at')
            ->first();

        $latestDate = $latestSubmission ? Carbon::parse($latestSubmission->submitted_at)->startOfDay() : null;
        
        $hasActivityToday = $latestDate && $latestDate->isSameDay($today);
        if ($lastActivityDateStr === $today->toDateString()) {
            $hasActivityToday = true;
        }

        $streakCount = $manualStreak;

        // If no manual streak yet, calculate from historical submission days
        if ($streakCount === 0) {
            $distinctDays = MissionSubmission::query()
                ->where('explorer_id', $explorer->id)
                ->whereIn('status', ['approved', 'submitted'])
                ->selectRaw('DATE(submitted_at) as sub_date')
                ->groupBy('sub_date')
                ->orderByDesc('sub_date')
                ->limit(30)
                ->pluck('sub_date')
                ->map(fn ($d) => Carbon::parse($d)->startOfDay());

            $calculated = 0;
            $checkDay = $hasActivityToday ? $today : $yesterday;

            foreach ($distinctDays as $day) {
                if ($day->isSameDay($checkDay)) {
                    $calculated++;
                    $checkDay = $checkDay->copy()->subDay();
                } else {
                    break;
                }
            }

            $streakCount = max(1, $calculated);
        }

        // Check if streak is at risk (active yesterday, but not yet today)
        $atRisk = !$hasActivityToday && $streakCount > 0;

        // Determine next milestone
        $milestones = [3, 7, 14, 30, 60, 100];
        $nextMilestone = 3;
        foreach ($milestones as $m) {
            if ($streakCount < $m) {
                $nextMilestone = $m;
                break;
            }
        }
        if ($streakCount >= 100) {
            $nextMilestone = $streakCount + 10;
        }

        // Multiplier bonus based on streak
        $multiplier = match (true) {
            $streakCount >= 30 => 1.50,
            $streakCount >= 14 => 1.30,
            $streakCount >= 7 => 1.20,
            $streakCount >= 3 => 1.10,
            default => 1.0,
        };

        return [
            'count' => $streakCount,
            'is_active_today' => $hasActivityToday,
            'at_risk' => $atRisk,
            'shields' => $shields,
            'multiplier' => $multiplier,
            'multiplier_label' => $multiplier > 1.0 ? '+' . (int)(($multiplier - 1.0) * 100) . '% bonus' : null,
            'next_milestone' => $nextMilestone,
            'days_to_milestone' => max(0, $nextMilestone - $streakCount),
            'progress_percent' => min(100, (int) round(($streakCount / $nextMilestone) * 100)),
        ];
    }

    /**
     * Get daily spin status & available prizes list.
     */
    public function getDailySpinStatus(Explorer $explorer): array
    {
        $prefs = $explorer->preferences ?? [];
        $lastSpinDate = $prefs['last_spin_date'] ?? null;
        $todayStr = Carbon::today()->toDateString();

        $canSpin = ($lastSpinDate !== $todayStr);

        return [
            'can_spin' => $canSpin,
            'last_spin_date' => $lastSpinDate,
            'prizes' => $this->getPrizesConfig(),
        ];
    }

    /**
     * Prize config for the Lucky Wheel.
     */
    public function getPrizesConfig(): array
    {
        return [
            ['id' => 1, 'label' => '+3 ⭐', 'type' => 'stars', 'value' => 3, 'color' => '#10b981', 'icon' => '⭐', 'weight' => 35, 'name' => '3 Estrellas'],
            ['id' => 2, 'label' => '+5 ⭐', 'type' => 'stars', 'value' => 5, 'color' => '#3b82f6', 'icon' => '🌟', 'weight' => 25, 'name' => '5 Estrellas'],
            ['id' => 3, 'label' => '+10 ⭐', 'type' => 'stars', 'value' => 10, 'color' => '#f59e0b', 'icon' => '✨', 'weight' => 15, 'name' => '10 Súper Estrellas'],
            ['id' => 4, 'label' => '🛡️ Escudo', 'type' => 'shield', 'value' => 1, 'color' => '#8b5cf6', 'icon' => '🛡️', 'weight' => 10, 'name' => 'Escudo de Racha'],
            ['id' => 5, 'label' => '🔥 +1 Racha', 'type' => 'streak', 'value' => 1, 'color' => '#ef4444', 'icon' => '🔥', 'weight' => 10, 'name' => 'Impulso de Racha (+1 día)'],
            ['id' => 6, 'label' => '🎁 +20 ⭐', 'type' => 'stars', 'value' => 20, 'color' => '#ec4899', 'icon' => '🏆', 'weight' => 5, 'name' => '¡Cofre Legendario (20 ⭐)!'],
        ];
    }

    /**
     * Execute the daily spin for an explorer.
     */
    public function spin(Explorer $explorer, ?User $user = null): array
    {
        $status = $this->getDailySpinStatus($explorer);
        if (!$status['can_spin']) {
            throw ValidationException::withMessages([
                'spin' => 'Ya giraste la ruleta de la suerte hoy. ¡Vuelve mañana para más premios!',
            ]);
        }

        $prizes = $this->getPrizesConfig();

        // Weighted random selection
        $totalWeight = array_sum(array_column($prizes, 'weight'));
        $random = mt_rand(1, $totalWeight);
        $currentWeight = 0;
        $selectedPrize = $prizes[0];

        foreach ($prizes as $prize) {
            $currentWeight += $prize['weight'];
            if ($random <= $currentWeight) {
                $selectedPrize = $prize;
                break;
            }
        }

        // Apply prize effects
        $prefs = $explorer->preferences ?? [];
        $prefs['last_spin_date'] = Carbon::today()->toDateString();
        $prefs['total_spins'] = ($prefs['total_spins'] ?? 0) + 1;

        if ($selectedPrize['type'] === 'stars') {
            $this->stars->adjust(
                $explorer,
                StarMovement::ADJUSTMENT_POSITIVE,
                $selectedPrize['value'],
                'Premio de la Ruleta Diaria de la Suerte 🎡✨',
                $user
            );
        } elseif ($selectedPrize['type'] === 'shield') {
            $prefs['streak_shields'] = ($prefs['streak_shields'] ?? 1) + 1;
        } elseif ($selectedPrize['type'] === 'streak') {
            $currentStreak = $prefs['streak_count'] ?? 1;
            $prefs['streak_count'] = $currentStreak + 1;
            $prefs['streak_last_date'] = Carbon::today()->toDateString();
        }

        $explorer->update(['preferences' => $prefs]);

        $updatedStreak = $this->calculateStreak($explorer);
        $newBalance = $this->stars->balance($explorer);

        return [
            'prize' => $selectedPrize,
            'available_stars' => $newBalance,
            'streak' => $updatedStreak,
            'daily_spin' => [
                'can_spin' => false,
                'last_spin_date' => Carbon::today()->toDateString(),
            ],
            'message' => '¡Felicitaciones! Has ganado ' . $selectedPrize['name'],
        ];
    }
}
