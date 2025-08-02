<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        //
    ];

    public function boot()
    {
        Gate::define('is-admin', fn($user) => $user->role === 'A');
        Gate::define('is-manager', fn($user) => $user->role === 'M');
        Gate::define('is-doctor', fn($user) => $user->role === 'D');
        Gate::define('is-secretary', fn($user) => $user->role === 'S');
        Gate::define('is-patient', fn($user) => $user->role === 'P');
    }
}
