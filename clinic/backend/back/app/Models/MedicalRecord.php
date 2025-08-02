<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PatientData;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'patient_data_id',
    ];

    public function patientData()
    {
        return $this->belongsTo(PatientData::class);
    }
}
