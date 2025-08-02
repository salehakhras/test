<?php

namespace App\Http\Requests\Manager\Service;
use Illuminate\Foundation\Http\FormRequest;

class AddServiceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'clinic_id' => ['required', 'integer', 'exists:clinics,id'],
            'service_id' => ['nullable', 'exists:services,id'],
            'name' => ['required_without:service_id', 'string'],
            'description' => ['nullable', 'string'],
            'duration' => ['nullable', 'string'],
            'stages_number' => ['nullable', 'integer'],
            'price' => ['required', 'numeric', 'min:0'],
            'stages' => ['nullable', 'array'],
            'stages.*.duration' => ['required_with:stages', 'date_format:H:i:s'],
            'stages.*.title' => ['required_with:stages', 'string'],
            'stages.*.specialization_id' => ['required_with:stages', 'exists:specializations,id'],
            'stages.*.description' => ['required_with:stages', 'string'],
        ];
    }
}

