<?php

namespace App\Http\Resources;

use App\Services\SubscriptionAccessService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TenantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $access = app(SubscriptionAccessService::class)->statusForTenant($this->resource);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'status' => $this->status,
            'timezone' => $this->timezone,
            'subscription' => [
                'state' => $access['state'],
                'allowed' => $access['allowed'],
                'message' => $access['message'],
                'trial_ends_at' => $access['trial_ends_at'] ?? null,
                'trial_days_remaining' => $access['trial_days_remaining'] ?? 0,
            ],
            'created_at' => $this->created_at,
        ];
    }
}
