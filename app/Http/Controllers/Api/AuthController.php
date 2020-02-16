<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Repositories\Interfaces\AuthRepositoryInterface;

class AuthController extends Controller
{

    public function __construct(AuthRepositoryInterface $authRepositoryInterface)
    {
        $this->middleware('auth:api')->except(['login', 'register']);
        $this->middleware('checkRole:SuperAdmin')->only('registerSuper');
        $this->middleware('checkRole:Admin')->only('registerResepsionis');
        $this->repository = $authRepositoryInterface;
    }

    public function login(LoginRequest $request)
    {
        return $this->repository->login($request);
    }

    public function register(RegisterRequest $request)
    {
        return $this->repository->register($request);
    }

    public function registerSuper(RegisterRequest $request)
    {
        return $this->repository->registerSuper($request);
    }

    public function registerResepsionis(RegisterRequest $request)
    {
        return $this->repository->registerResepsionis($request);
    }

    public function refresh()
    {
        return $this->repository->refresh();
    }

    public function logout()
    {
        return $this->repository->logout();
    }
}
