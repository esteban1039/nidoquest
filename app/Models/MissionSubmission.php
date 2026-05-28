<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MissionSubmission extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'mission_id',
        'explorer_id',
        'reviewed_by',
        'status',
        'evidence_text',
        'evidence_path',
        'guide_feedback',
        'submitted_at',
        'reviewed_at',
    ];

    protected function casts(): array
    {
        return ['submitted_at' => 'datetime', 'reviewed_at' => 'datetime'];
    }

    public function mission(): BelongsTo
    {
        return $this->belongsTo(Mission::class);
    }

    public function explorer(): BelongsTo
    {
        return $this->belongsTo(Explorer::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
