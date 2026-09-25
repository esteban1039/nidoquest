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
            'has_account' => $this->user_id !== null,
            'name' => $this->name,
            'email' => $this->user?->email,
            'login_identifier' => $this->user ? (str_ends_with($this->user->email, '@nidoquest.local') ? str_replace('@nidoquest.local', '', $this->user->email) : $this->user->email) : null,
            'birthdate' => $this->birthdate,
            'avatar' => $this->avatar,
            'status' => $this->status,
            'available_stars' => $this->availableStars(),
            'age' => $this->age(),
            'age_group' => $this->ageGroup(),
            'mission_guidance' => $this->missionGuidance(),
        ];
    }
}
