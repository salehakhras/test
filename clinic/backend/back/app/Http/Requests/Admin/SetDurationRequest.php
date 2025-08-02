<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SetDurationRequest extends FormRequest
{
    public function rules()
    {
        return [
            'days' => 'required|integer|min:1'
        ];
    }

}
