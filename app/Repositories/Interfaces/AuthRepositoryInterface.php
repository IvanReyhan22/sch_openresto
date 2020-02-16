<?php

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;

interface AuthRepositoryInterface
{
    public function login(Request $request);
    public function register(Request $request);
    public function registerSuper(Request $request);
    public function registerResepsionis(Request $request);
    public function refresh();
    public function logout();
}
