<?php

namespace App\Http\Requests\Mission;

use Illuminate\Foundation\Http\FormRequest;

class SubmitMissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['super_admin', 'guide', 'explorer'], true);
    }

    public function rules(): array
    {
        return [
            'evidence_text' => ['nullable', 'string'],
            'evidence_path' => ['nullable', 'string', 'max:2048'],
        ];
    }
}
