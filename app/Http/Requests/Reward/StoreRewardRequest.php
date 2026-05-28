<?php

namespace App\Http\Requests\Reward;

use Illuminate\Foundation\Http\FormRequest;

class StoreRewardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['super_admin', 'guide'], true);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'stars_cost' => ['required', 'integer', 'min:1'],
            'category' => ['nullable', 'string', 'max:120'],
            'type' => ['required', 'in:screen_time,money,experience,gift,family,custom'],
            'requires_approval' => ['boolean'],
            'limit_per_day' => ['nullable', 'integer', 'min:1'],
            'limit_per_week' => ['nullable', 'integer', 'min:1'],
            'image' => ['nullable', 'string', 'max:2048'],
            'active' => ['boolean'],
        ];
    }
}
