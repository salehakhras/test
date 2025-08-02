<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class EmailLoginRequest extends FormRequest
{

    public function rules()
    {
        return [
            'email' => ['required', 'string', 'email', 'exists:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'fcm_token' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email is required.',
            'email.string' => 'Email must be a string.',
            'email.email' => 'Email format is invalid.',
            'email.exists' => 'This email is not registered.',
            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a string.',
            'password.min' => 'Password must be at least 8 characters.',
            'fcm_token.required' => 'FCM token is required.',
            'fcm_token.string' => 'FCM token must be a string.',
        ];
    }
}
