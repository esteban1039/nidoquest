<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Database\Factories\RewardFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reward extends Model
{
    /** @use HasFactory<RewardFactory> */
    use BelongsToTenant, HasFactory;

    protected $fillable = [
        'tenant_id',
        'name',
        'description',
        'stars_cost',
        'category',
        'type',
        'requires_approval',
        'limit_per_day',
        'limit_per_week',
        'image',
        'active',
    ];

    protected function casts(): array
    {
        return ['requires_approval' => 'boolean', 'active' => 'boolean'];
    }

    public function redemptions(): HasMany
    {
        return $this->hasMany(RewardRedemption::class);
    }
}
