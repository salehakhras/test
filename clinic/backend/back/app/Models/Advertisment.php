<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AdvertismentImages;
use App\Models\Clinic;

class Advertisment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'clinic_id',
        'subscribed_at',
        'id'
    ];

    public function images()
    {
        return $this->hasMany(AdvertismentImages::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}
