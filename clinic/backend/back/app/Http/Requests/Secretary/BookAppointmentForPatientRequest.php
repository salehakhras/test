<?php

namespace App\Http\Requests\Secretary;

use Illuminate\Foundation\Http\FormRequest;

class BookAppointmentForPatientRequest extends FormRequest
{
    
    public function rules()
    {
        return [
            'number' => ['nullable', 'exists:users,number'],
            'email' => ['nullable', 'exists:users,email'],
            'date' => ['required', 'date'],
            'doctor_id' => ['required', 'exists:doctors,id'],
            'clinic_id' => ['required', 'exists:clinics,id'],
            'time' => ['required', 'date_format:H:i:s'],
            'treatment_id' => ['required', 'exists:treatments,id'],
        ];
    }
}
