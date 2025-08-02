<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordVerifyRequest extends FormRequest
{

    public function rules()
    {
        return [
            'otp' => ['required', 'string', 'min:6', 'max:6'],
            'new_password' => ['required', 'string', 'min:8']
        ];
    }

    public function messages()
    {
        return [
            'otp.required' => 'OTP is required.',
            'otp.string' => 'OTP must be a string.',
            'otp.min' => 'OTP must be exactly 6 digits.',
            'otp.max' => 'OTP must be exactly 6 digits.',
            'new_password.required' => 'New password is required.',
            'new_password.string' => 'New password must be a string.',
            'new_password.min' => 'New password must be at least 8 characters.',
        ];
    }
}
