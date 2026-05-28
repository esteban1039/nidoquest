<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Database\Factories\ExplorerFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Explorer extends Model
{
    /** @use HasFactory<ExplorerFactory> */
    use BelongsToTenant, HasFactory;

    protected $fillable = ['tenant_id', 'user_id', 'guide_id', 'name', 'birthdate', 'avatar', 'status', 'preferences'];

    protected function casts(): array
    {
        return ['birthdate' => 'date', 'preferences' => 'array'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function guide(): BelongsTo
    {
        return $this->belongsTo(User::class, 'guide_id');
    }

    public function missions(): HasMany
    {
        return $this->hasMany(Mission::class);
    }

    public function starMovements(): HasMany
    {
        return $this->hasMany(StarMovement::class);
    }

    public function rewards(): HasMany
    {
        return $this->hasMany(RewardRedemption::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'explorer_badges')->withPivot('earned_at')->withTimestamps();
    }

    public function availableStars(): int
    {
        return (int) $this->starMovements()->sum('amount');
    }
}
