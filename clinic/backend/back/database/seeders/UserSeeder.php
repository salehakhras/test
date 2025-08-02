<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{

public function run()
{
    $user = User::factory()->create([
        'name' => 'Admin User',
        'email' => 'admin@dentalcare.com',
        'number' => '0934567890',
        'password' => bcrypt('admin1234'),
        'verified_at' => now(),
        'profile_image' => 'https://via.placeholder.com/200x200.png/003388?text=people+sed',
        'fcm_token' => '03b9f6bf-f0e5-313a-a429-c16df9839e5d',
    ]);

    $adminRole = Role::where('name', 'admin')->first();
    $user->roles()->attach($adminRole->id);
}

}
