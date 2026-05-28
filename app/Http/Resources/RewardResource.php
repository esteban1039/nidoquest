<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RewardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tenant_id' => $this->tenant_id,
            'name' => $this->name,
            'description' => $this->description,
            'stars_cost' => $this->stars_cost,
            'category' => $this->category,
            'type' => $this->type,
            'requires_approval' => $this->requires_approval,
            'limit_per_day' => $this->limit_per_day,
            'limit_per_week' => $this->limit_per_week,
            'image' => $this->image,
            'active' => $this->active,
        ];
    }
}
