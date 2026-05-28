<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Badge extends Model
{
    use BelongsToTenant;

    protected $fillable = ['tenant_id', 'name', 'description', 'icon', 'criteria', 'active'];

    protected function casts(): array
    {
        return ['criteria' => 'array', 'active' => 'boolean'];
    }

    public function explorers(): BelongsToMany
    {
        return $this->belongsToMany(Explorer::class, 'explorer_badges')->withPivot('earned_at')->withTimestamps();
    }
}
