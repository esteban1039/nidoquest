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

    public const AGE_PEQUES = 'peques';

    public const AGE_MEDIOS = 'medios';

    public const AGE_JOVENES = 'jovenes';

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

    public function rewardRedemptions(): HasMany
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

    public function age(): ?int
    {
        if (! $this->birthdate || $this->birthdate->isFuture()) {
            return null;
        }

        return $this->birthdate->age;
    }

    public function ageGroup(): ?string
    {
        $age = $this->age();

        if ($age === null) {
            return null;
        }

        return match (true) {
            $age <= 8 => self::AGE_PEQUES,
            $age <= 13 => self::AGE_MEDIOS,
            default => self::AGE_JOVENES,
        };
    }

    /**
     * @return array{difficulty: string, stars_min: int, stars_max: int}|null
     */
    public function missionGuidance(): ?array
    {
        return match ($this->ageGroup()) {
            self::AGE_PEQUES => ['difficulty' => 'easy', 'stars_min' => 3, 'stars_max' => 8],
            self::AGE_MEDIOS => ['difficulty' => 'medium', 'stars_min' => 5, 'stars_max' => 15],
            self::AGE_JOVENES => ['difficulty' => 'challenging', 'stars_min' => 10, 'stars_max' => 30],
            default => null,
        };
    }
}
