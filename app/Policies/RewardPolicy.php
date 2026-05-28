<?php

namespace App\Policies;

use App\Models\Reward;
use App\Models\User;

class RewardPolicy
{
    public function view(User $user, Reward $reward): bool
    {
        return $user->belongsToTenant($reward->tenant_id);
    }

    public function manage(User $user, Reward $reward): bool
    {
        return $user->isSuperAdmin() || ($user->role === 'guide' && $user->belongsToTenant($reward->tenant_id));
    }
}
