<?php

namespace App\Http\Requests\Manager\Advertisment;
use Illuminate\Foundation\Http\FormRequest;
//Models
use App\Models\Clinic;

class AddAdvertismentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'clinic_id' => ['required', 'integer', 'exists:clinics,id'],
            'title' => ['required', 'string'],
            'description' => ['required', 'string', 'max:255'],
        ];
    }
}
