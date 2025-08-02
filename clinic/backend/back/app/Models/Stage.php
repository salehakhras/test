<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ServiceStage;
use App\Models\Specialization;

class Stage extends Model
{
    use HasFactory;

    protected $fillable = [
        'duration',
        'title',
        'description',
        'specialization_id'
    ];

    public function services()
    {
        return $this->belongsToMany(Service::class)
            ->using(ServiceStage::class)
            ->withPivot('order')
            ->withTimestamps();
    }

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }

}
