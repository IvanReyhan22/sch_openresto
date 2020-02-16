<?php

namespace App\Repositories;

use App\Repositories\Interfaces\AuthRepositoryInterface;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthRepository extends Repository implements AuthRepositoryInterface
{
    private $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function login(Request $request)
    {
        if (!$token = Auth::attempt($request->all())) {
            return $this->responseUnauthorized();
        }
        return $this->responseWithToken($token);
    }

    public function register(Request $request)
    {
        $user = $request->all();
        $user['password'] = bcrypt($user['password']);
        $store = User::create($user);
        if ($request->role == "SuperAdmin" || $request->role == "Resepsionis") {
            $this->respond("USERS.ALL");
            if ($request->has('restoran_id')) {
                $this->respond("USERS.ALL.RESTORAN.{$request->restoran_id}");
            }
            return $this->responseSuccess("User berhasil ditambahkan");
        }
        $token = Auth::login($store);
        return $this->responseWithToken($token);
    }

    public function registerSuper(Request $request)
    {
        return $this->register($request);
    }

    public function registerResepsionis(Request $request)
    {
        return $this->register($request);
    }

    public function refresh()
    {
        return $this->responseWithToken(Auth::refresh());
    }

    public function logout()
    {
        Auth::logout();
        return $this->responseSuccess('Logout Berhasil');
    }
}
