<?php

namespace App\Http\Requests\Patient;

use Illuminate\Foundation\Http\FormRequest;

class BookAppointmentRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'date' => ['required', 'date'],
            'doctor_id' => ['required', 'exists:doctors,id'],
            'clinic_id' => ['required', 'exists:clinics,id'],
            'time' => ['required', 'date_format:H:i:s'],
            'treatment_id' => ['required', 'exists:treatments,id'],
        ];
    }
}
