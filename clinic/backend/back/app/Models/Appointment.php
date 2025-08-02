<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Doctor;
use App\Models\Clinic;
use App\Models\Treatment;
use App\Model\User;

class Appointment extends Model
{
    use HasFactory;
    const status = ['C', 'UC', 'A'];
    protected $fillable = [
        'date',
        'time',
        'duration',
        'title',
        'description',
        'clinic_id',
        'treatment_id',
        'doctor_id',
        'user_id',
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
