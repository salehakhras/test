<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SetPriceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'price' => ['required', 'numeric', 'min:0'],
        ];
    }
}
