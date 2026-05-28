<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RewardRedemption extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'reward_id',
        'explorer_id',
        'approved_by',
        'status',
        'stars_cost',
        'note',
        'approved_at',
        'delivered_at',
    ];

    protected function casts(): array
    {
        return ['approved_at' => 'datetime', 'delivered_at' => 'datetime'];
    }

    public function reward(): BelongsTo
    {
        return $this->belongsTo(Reward::class);
    }

    public function explorer(): BelongsTo
    {
        return $this->belongsTo(Explorer::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
