<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Specialization;

class SpecializationSeeder extends Seeder
{
   public function run()
    {
        $specializations = [
            ['code' => 'G', 'name' => 'General'],
            ['code' => 'C', 'name' => 'Cosmetic'],
            ['code' => 'E', 'name' => 'Endodontics'],
            ['code' => 'O', 'name' => 'Orthodontics'],
        ];

        foreach ($specializations as $specialization) {
            Specialization::create($specialization);
        }
    }

}
