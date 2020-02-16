<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\UsersRepositoryInterface;

class UsersController extends Controller
{
    public function __construct(UsersRepositoryInterface $usersRepositoryInterface)
    {
        $this->middleware(['auth:api', 'checkRole:SuperAdmin'])->only('index');
        $this->middleware(['auth:api', 'checkRole:Admin'])->only('restoran');
        $this->repository = $usersRepositoryInterface;
    }

    public function index()
    {
        return $this->repository->all();
    }

    public function restoran(int $id)
    {
        return $this->repository->allResepsionis($id);
    }
}
