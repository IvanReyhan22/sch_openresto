<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Validator::extend('current_password', function ($attribute, $value, $parameters, $validator) {
            $user = Auth::user();
            return $user && Hash::check($value, $user->password);
        });
        Validator::extend('same_password', function ($attribute, $value, $parameters, $validator) {
            $user = Auth::user();
            return $user && !Hash::check($value, $user->password);
        });
    }
}
