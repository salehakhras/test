<?php
namespace App\Http\Requests\Manager\Clinic;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
//Models
use App\Models\Clinic;

class UpdateClinicRequest extends FormRequest
{
    public function rules()
    {
        return [
            'clinic_id' => ['required', 'integer', 'exists:clinics,id'],
            'name' => ['sometimes', 'string'],
            'bio' => ['sometimes', 'string', 'max:255'],
            'phone' => ['sometimes', 'string', Rule::unique('clinics', 'phone')->ignore($this->input('clinic_id'))],
            'street_name' => ['sometimes', 'string'],
            'city_name' => ['sometimes', 'string'],
        ];
    }
}
