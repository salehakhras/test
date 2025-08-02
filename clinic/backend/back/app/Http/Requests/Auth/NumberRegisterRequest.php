<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class NumberRegisterRequest extends FormRequest
{

    public function rules()
    {
        return [
            'number' => ['required', 'string', 'min:10', 'max:10', 'unique:users,number'],
            'name' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8'],
            'fcm_token' => ['required', 'string']
        ];
    }

    public function messages()
    {
        return [
            'number.required' => 'Number is required.',
            'number.string' => 'Number must be a string.',
            'number.min' => 'Number must be exactly 10 digits.',
            'number.max' => 'Number must be exactly 10 digits.',
            'number.unique' => 'This number is already registered.',
            'name.required' => 'Name is required.',
            'name.string' => 'Name must be a string.',
            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a string.',
            'password.min' => 'Password must be at least 8 characters.',
            'fcm_token.required' => 'FCM token is required.',
            'fcm_token.string' => 'FCM token must be a string.',
        ];
    }
}
