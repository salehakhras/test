<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordOTPRequest extends FormRequest
{

    public function rules()
    {
        return [
            'email' => ['sometimes' , 'email'],
            'number' => ['sometimes' , 'string']
        ];
    }

    public function messages()
    {
        return [
            'email.email' => 'Email format is invalid.',
            'number.string' => 'Number must be a string.',
        ];
    }
}
