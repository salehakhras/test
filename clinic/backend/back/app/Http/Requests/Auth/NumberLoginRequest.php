<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class NumberLoginRequest extends FormRequest
{

    public function rules()
    {
        return [
            'number' => ['required', 'string', 'exists:users,number'],
            'password' => ['required', 'string', 'min:8'],
            'fcm_token' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'number.required' => 'Number is required.',
            'number.string' => 'Number must be a string.',
            'number.exists' => 'This number is not registered.',
            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a string.',
            'password.min' => 'Password must be at least 8 characters.',
            'fcm_token.required' => 'FCM token is required.',
            'fcm_token.string' => 'FCM token must be a string.',
        ];
    }
}
