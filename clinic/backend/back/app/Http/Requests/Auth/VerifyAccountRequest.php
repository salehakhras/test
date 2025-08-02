<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyAccountRequest extends FormRequest
{

    public function rules()
    {
        return [
            'otp' => ['required', 'string', 'min:6', 'max:6']
        ];
    }

    public function messages()
    {
        return [
            'otp.required' => 'OTP is required.',
            'otp.string' => 'OTP must be a string.',
            'otp.min' => 'OTP must be exactly 6 digits.',
            'otp.max' => 'OTP must be exactly 6 digits.',
        ];
    }
}
