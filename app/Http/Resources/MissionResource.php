<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tenant_id' => $this->tenant_id,
            'title' => $this->title,
            'description' => $this->description,
            'growth_area_id' => $this->growth_area_id,
            'explorer_id' => $this->explorer_id,
            'stars' => $this->stars,
            'frequency' => $this->frequency,
            'due_date' => $this->due_date,
            'suggested_time' => $this->suggested_time,
            'evidence_required' => $this->evidence_required,
            'evidence_type' => $this->evidence_type,
            'difficulty' => $this->difficulty,
            'status' => $this->status,
            'motivational_message' => $this->motivational_message,
            'active' => $this->active,
        ];
    }
}
