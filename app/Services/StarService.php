<?php

namespace App\Services;

use App\Models\Explorer;
use App\Models\Mission;
use App\Models\Reward;
use App\Models\StarMovement;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StarService
{
    public function balance(Explorer $explorer): int
    {
        return (int) $explorer->starMovements()->sum('amount');
    }

    public function earn(Explorer $explorer, Mission $mission, ?User $creator): StarMovement
    {
        return $this->movement($explorer, StarMovement::EARNED, $mission->stars, 'Misión completada con constancia.', $creator, $mission);
    }

    public function adjust(Explorer $explorer, string $type, int $amount, string $reason, ?User $creator): StarMovement
    {
        if ($type === StarMovement::ADJUSTMENT_NEGATIVE) {
            $amount = -abs($amount);
            $reason = $reason ?: 'Ajuste amable para seguir practicando y mejorar poco a poco.';
        }

        if ($type === StarMovement::ADJUSTMENT_POSITIVE) {
            $amount = abs($amount);
        }

        return $this->movement($explorer, $type, $amount, $reason, $creator);
    }

    public function redeem(Explorer $explorer, Reward $reward, ?User $creator): StarMovement
    {
        if ($this->balance($explorer) < $reward->stars_cost) {
            throw ValidationException::withMessages([
                'reward_id' => 'Todavía faltan algunas Estrellas para esta Recompensa. Pueden seguir avanzando paso a paso.',
            ]);
        }

        return $this->movement($explorer, StarMovement::REDEEMED, -abs($reward->stars_cost), 'Recompensa redimida.', $creator, reward: $reward);
    }

    private function movement(Explorer $explorer, string $type, int $amount, string $reason, ?User $creator, ?Mission $mission = null, ?Reward $reward = null): StarMovement
    {
        return DB::transaction(fn () => StarMovement::create([
            'tenant_id' => $explorer->tenant_id,
            'explorer_id' => $explorer->id,
            'mission_id' => $mission?->id,
            'reward_id' => $reward?->id,
            'type' => $type,
            'amount' => $amount,
            'reason' => $reason,
            'created_by' => $creator?->id,
        ]));
    }
}
