<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StarMovement extends Model
{
    use BelongsToTenant;

    public const EARNED = 'earned';
    public const REDEEMED = 'redeemed';
    public const ADJUSTMENT_POSITIVE = 'adjustment_positive';
    public const ADJUSTMENT_NEGATIVE = 'adjustment_negative';
    public const REVERSAL = 'reversal';

    protected $fillable = ['tenant_id', 'explorer_id', 'mission_id', 'reward_id', 'type', 'amount', 'reason', 'created_by'];

    protected static function booted(): void
    {
        static::deleting(fn () => false);
    }

    public function explorer(): BelongsTo
    {
        return $this->belongsTo(Explorer::class);
    }

    public function mission(): BelongsTo
    {
        return $this->belongsTo(Mission::class);
    }

    public function reward(): BelongsTo
    {
        return $this->belongsTo(Reward::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
