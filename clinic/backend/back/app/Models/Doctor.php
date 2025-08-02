<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Treatment;
use App\Models\ClinicDoctor;
use App\Models\Specialization;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'experience_years',
        'bio',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class);
    }

    public function clinics()
    {
        return $this->belongsToMany(Clinic::class, 'clinic_doctor', 'doctor_id', 'clinic_id');
    }

    public function specializations()
    {
        return $this->belongsToMany(Specialization::class, 'doctor_specialization');
    }


}
