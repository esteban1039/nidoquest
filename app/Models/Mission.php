<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Database\Factories\MissionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Mission extends Model
{
    /** @use HasFactory<MissionFactory> */
    use BelongsToTenant, HasFactory;

    protected $fillable = [
        'tenant_id',
        'title',
        'description',
        'growth_area_id',
        'explorer_id',
        'stars',
        'frequency',
        'due_date',
        'suggested_time',
        'evidence_required',
        'evidence_type',
        'difficulty',
        'status',
        'motivational_message',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
            'evidence_required' => 'boolean',
            'active' => 'boolean',
        ];
    }

    public function growthArea(): BelongsTo
    {
        return $this->belongsTo(GrowthArea::class);
    }

    public function explorer(): BelongsTo
    {
        return $this->belongsTo(Explorer::class);
    }

    public function schedule(): HasOne
    {
        return $this->hasOne(MissionSchedule::class);
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(MissionSubmission::class);
    }
}
