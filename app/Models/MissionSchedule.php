<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MissionSchedule extends Model
{
    use BelongsToTenant;

    protected $fillable = ['tenant_id', 'mission_id', 'days_of_week', 'starts_at', 'ends_at', 'custom_rule'];

    protected function casts(): array
    {
        return ['days_of_week' => 'array', 'starts_at' => 'date', 'ends_at' => 'date', 'custom_rule' => 'array'];
    }

    public function mission(): BelongsTo
    {
        return $this->belongsTo(Mission::class);
    }
}
