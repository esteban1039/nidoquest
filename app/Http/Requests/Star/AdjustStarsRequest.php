<?php

namespace App\Http\Requests\Star;

use Illuminate\Foundation\Http\FormRequest;

class AdjustStarsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['super_admin', 'guide'], true);
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:adjustment_positive,adjustment_negative,reversal'],
            'amount' => ['required', 'integer', 'min:1', 'max:500'],
            'reason' => ['nullable', 'string', 'max:500'],
        ];
    }
}
