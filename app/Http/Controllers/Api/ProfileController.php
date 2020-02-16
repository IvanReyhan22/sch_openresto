<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Repositories\Interfaces\ProfileRepositoryInterface;

class ProfileController extends Controller
{
    public function __construct(ProfileRepositoryInterface $profileRepositoryInterface)
    {
        $this->middleware('auth:api');
        $this->repository = $profileRepositoryInterface;
    }

    public function index()
    {
        return $this->repository->profile();
    }

    public function update(RegisterRequest $request)
    {
        return $this->repository->update($request);
    }
}
