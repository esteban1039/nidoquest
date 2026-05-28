<?php

namespace App\Services;

use App\Models\Explorer;
use App\Models\Reward;
use App\Models\RewardRedemption;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RewardRedemptionService
{
    public function __construct(private readonly StarService $stars)
    {
    }

    public function request(Explorer $explorer, Reward $reward, ?string $note = null): RewardRedemption
    {
        if ($this->stars->balance($explorer) < $reward->stars_cost) {
            abort(422, 'Todavía faltan algunas Estrellas para esta Recompensa.');
        }

        return RewardRedemption::create([
            'tenant_id' => $explorer->tenant_id,
            'reward_id' => $reward->id,
            'explorer_id' => $explorer->id,
            'status' => 'requested',
            'stars_cost' => $reward->stars_cost,
            'note' => $note,
        ]);
    }

    public function approve(RewardRedemption $redemption, User $guide): RewardRedemption
    {
        return DB::transaction(function () use ($redemption, $guide) {
            $redemption->update([
                'status' => 'approved',
                'approved_by' => $guide->id,
                'approved_at' => now(),
            ]);

            $this->stars->redeem($redemption->explorer, $redemption->reward, $guide);

            return $redemption->refresh();
        });
    }
}
