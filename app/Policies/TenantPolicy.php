<?php

namespace App\Policies;

use App\Models\Tenant;
use App\Models\User;

class TenantPolicy
{
    public function view(User $user, Tenant $tenant): bool
    {
        return $user->belongsToTenant($tenant->id);
    }

    public function update(User $user, Tenant $tenant): bool
    {
        return $user->isSuperAdmin() || $tenant->owner_id === $user->id;
    }
}
