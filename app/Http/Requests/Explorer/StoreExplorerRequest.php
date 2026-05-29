<?php

namespace App\Http\Requests\Explorer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExplorerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['super_admin', 'guide'], true);
    }

    public function rules(): array
    {
        $explorer = $this->route('explorer');
        $userId = $explorer?->user_id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'password' => ['nullable', 'string', 'min:8'],
            'birthdate' => ['nullable', 'date', 'before:today'],
            'avatar' => ['nullable', 'string', 'max:2048'],
            'preferences' => ['nullable', 'array'],
        ];
    }
}
