<?php

namespace App\Services;

use App\Models\Explorer;
use App\Models\Reward;
use App\Models\RewardRedemption;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RewardRedemptionService
{
    public function __construct(private readonly StarService $stars, private readonly BadgeService $badges)
    {
    }

    public function request(Explorer $explorer, Reward $reward, ?string $note = null, ?string $mutationId = null): RewardRedemption
    {
        // Reintento de la cola offline: devuelve la solicitud ya creada.
        if (is_string($mutationId) && $mutationId !== '') {
            $existing = RewardRedemption::query()
                ->where('tenant_id', $explorer->tenant_id)
                ->where('reward_id', $reward->id)
                ->where('explorer_id', $explorer->id)
                ->where('client_mutation_id', $mutationId)
                ->first();

            if ($existing) {
                return $existing;
            }
        }

        $reservedStars = RewardRedemption::query()
            ->where('explorer_id', $explorer->id)
            ->where('status', 'requested')
            ->sum('stars_cost');

        if (($this->stars->balance($explorer) - $reservedStars) < $reward->stars_cost) {
            throw ValidationException::withMessages([
                'reward_id' => 'Todavia faltan algunas Estrellas disponibles para esta Recompensa.',
            ]);
        }

        return RewardRedemption::create([
            'tenant_id' => $explorer->tenant_id,
            'reward_id' => $reward->id,
            'explorer_id' => $explorer->id,
            'client_mutation_id' => is_string($mutationId) && $mutationId !== '' ? $mutationId : null,
            'status' => 'requested',
            'stars_cost' => $reward->stars_cost,
            'note' => $note,
        ]);
    }

    public function approve(RewardRedemption $redemption, User $guide): RewardRedemption
    {
        return DB::transaction(function () use ($redemption, $guide) {
            if ($redemption->status !== 'requested') {
                throw ValidationException::withMessages([
                    'redemption_id' => 'Esta solicitud ya fue revisada.',
                ]);
            }

            $redemption->update([
                'status' => 'approved',
                'approved_by' => $guide->id,
                'approved_at' => now(),
            ]);

            $this->stars->redeem($redemption->explorer, $redemption->reward, $guide);
            $this->badges->grantForRedemption($redemption->explorer);

            return $redemption->refresh();
        });
    }
}
