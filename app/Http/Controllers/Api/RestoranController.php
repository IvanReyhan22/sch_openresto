<?php

namespace App\Http\Controllers\Api;

use App\Restoran;
use App\Http\Requests\SearchRequest;
use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Repositories\Interfaces\RestoranRepositoryInterface;

class RestoranController extends Controller
{
    use Crud;

    public function __construct(RestoranRepositoryInterface $restoranRepositoryInterface, Restoran $restoran)
    {
        $this->middleware('auth:api')->only(['store', 'update', 'destroy']);
        $this->middleware('checkRole:Admin')->only(['store', 'update']);
        $this->middleware('checkUpdateRestoran')->only('update');
        $this->middleware('checkRole:Admin,Superadmin')->only('destroy');
        $this->repository = $restoranRepositoryInterface;
        $this->model = $restoran;
    }

    public function search(SearchRequest $request)
    {
        return $this->repository->search($request);
    }

    public function showWithMeja(Restoran $restoran)
    {
        return $this->repository->showWithMeja($restoran);
    }

    public function withMenu(Restoran $restoran)
    {
        return $this->repository->withMenu($restoran);
    }
}
