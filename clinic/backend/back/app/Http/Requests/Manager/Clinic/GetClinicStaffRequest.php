<?php

namespace App\Http\Requests\Manager\Clinic;

use Illuminate\Foundation\Http\FormRequest;

class GetClinicStaffRequest extends FormRequest
{
    public function rules()
    {
        return [
            'clinic_id' => ['required', 'integer', 'exists:clinics,id'],
        ];
    }
}
