<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotificationSubscription extends Model
{
    use BelongsToTenant;

    protected $fillable = ['tenant_id', 'user_id', 'channel', 'endpoint', 'keys', 'preferences', 'active'];

    protected function casts(): array
    {
        return [
            'keys' => 'array',
            'preferences' => 'array',
            'active' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
