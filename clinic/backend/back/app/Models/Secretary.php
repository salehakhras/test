<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Clinic;
use App\Models\WorkingHour;

class Secretary extends Model
{
    use HasFactory;

    protected $fillable = [
        'bio',
        'user_id',
        'clinic_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function workingHours()
    {
        return $this->belongsToMany(WorkingHour::class, 'secretary_working_hour')
                    ->withPivot('working_day')
                    ->withTimestamps();
    }
}
