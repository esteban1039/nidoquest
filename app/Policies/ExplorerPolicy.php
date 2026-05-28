<?php

namespace App\Policies;

use App\Models\Explorer;
use App\Models\User;

class ExplorerPolicy
{
    public function view(User $user, Explorer $explorer): bool
    {
        return $user->belongsToTenant($explorer->tenant_id) && ($user->role !== 'explorer' || $explorer->user_id === $user->id);
    }

    public function manage(User $user, Explorer $explorer): bool
    {
        return $user->isSuperAdmin() || ($user->role === 'guide' && $user->belongsToTenant($explorer->tenant_id));
    }
}
