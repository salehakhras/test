<?php

namespace App\Http\Requests\Secretary;

use Illuminate\Foundation\Http\FormRequest;

class GetAvailableStagesForPatientRequest extends FormRequest
{
    
    public function rules()
    {
        return [
            'number' => ['nullable', 'exists:users,number'],
            'email' => ['nullable', 'exists:users,email'],
        ];
    }
}
