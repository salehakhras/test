<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Advertisment;
use App\Models\ClinicImages;
use App\Models\Appointment;
use App\Models\Review;
use App\Models\Secretary;
use App\Models\ClinicService;
use App\Models\ClinicDoctor;

class Clinic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'bio',
        'street_id',
        'user_id',
        'subscribed_at'
    ];

    public function street()
    {
        return $this->belongsTo(Street::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function advertisments()
    {
        return $this->hasMany(Advertisment::class);
    }

    public function clinicImages()
    {
        return $this->hasMany(ClinicImages::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function secretaries()
    {
        return $this->hasMany(Secretary::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class)
            ->using(ClinicService::class)
            ->withPivot('price')
            ->withTimestamps();
    }

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'clinic_doctor', 'clinic_id', 'doctor_id');
    }


    public function workingHours()
    {
        return $this->belongsToMany(WorkingHour::class, 'clinic_working_hour')
            ->withPivot('working_day')
            ->withTimestamps();
    }

}
