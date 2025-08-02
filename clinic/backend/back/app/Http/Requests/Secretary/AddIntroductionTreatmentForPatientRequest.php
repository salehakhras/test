<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddIntroductionTreatmentForPatientRequest extends FormRequest
{
    
    public function rules()
    {
        return [
            'number' => ['nullable', 'exists:users,number'],
            'email' => ['nullable', 'exists:users,email'],
        ];
    }
}
