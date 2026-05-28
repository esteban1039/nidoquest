<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use BelongsToTenant;

    protected $fillable = ['tenant_id', 'subscription_id', 'user_id', 'provider', 'provider_reference', 'status', 'amount_cents', 'currency', 'payload', 'paid_at'];

    protected function casts(): array
    {
        return ['payload' => 'array', 'paid_at' => 'datetime'];
    }

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
