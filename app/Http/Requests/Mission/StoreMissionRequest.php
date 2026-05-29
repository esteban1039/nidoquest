<?php

namespace App\Http\Requests\Mission;

use Illuminate\Foundation\Http\FormRequest;

class StoreMissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['super_admin', 'guide'], true);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'growth_area_id' => ['required', 'exists:growth_areas,id'],
            'explorer_id' => ['required', 'exists:explorers,id'],
            'stars' => ['required', 'integer', 'min:1', 'max:100'],
            'frequency' => ['required', 'in:once,daily,weekly,monthly,custom'],
            'due_date' => ['nullable', 'date'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'suggested_time' => ['nullable', 'date_format:H:i'],
            'evidence_required' => ['boolean'],
            'evidence_type' => ['required', 'in:none,text,photo,guide_confirmation'],
            'difficulty' => ['required', 'in:easy,medium,challenging'],
            'motivational_message' => ['nullable', 'string', 'max:255'],
            'active' => ['boolean'],
        ];
    }
}
