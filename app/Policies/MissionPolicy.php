<?php

namespace App\Policies;

use App\Models\Mission;
use App\Models\User;

class MissionPolicy
{
    public function view(User $user, Mission $mission): bool
    {
        return $user->belongsToTenant($mission->tenant_id) && ($user->role !== 'explorer' || $mission->explorer->user_id === $user->id);
    }

    public function manage(User $user, Mission $mission): bool
    {
        return $user->isSuperAdmin() || ($user->role === 'guide' && $user->belongsToTenant($mission->tenant_id));
    }
}
