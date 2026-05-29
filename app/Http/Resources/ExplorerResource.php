<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExplorerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tenant_id' => $this->tenant_id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'email' => $this->user?->email,
            'birthdate' => $this->birthdate,
            'avatar' => $this->avatar,
            'status' => $this->status,
            'available_stars' => $this->availableStars(),
        ];
    }
}
