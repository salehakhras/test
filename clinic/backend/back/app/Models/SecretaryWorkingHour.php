<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Secretary;
use App\Models\WorkingHour;

class SecretaryWorkingHour extends Model
{
    use HasFactory;

    protected $table = 'secretary_working_hour';
    protected $fillable = [
        'secretary_id',
        'working_hour_id',
        'working_day',
    ];

    public function secretary()
    {
        return $this->belongsTo(Secretary::class);
    }

    public function working_hour()
    {
        return $this->belongsTo(WorkingHour::class);
    }
}
