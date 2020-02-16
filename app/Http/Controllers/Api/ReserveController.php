<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReserveRequest;
use App\Repositories\Interfaces\ReserveRepositoryInterface;
use App\Reserve;

class ReserveController extends Controller
{

    public function __construct(ReserveRepositoryInterface $reserveRepositoryInterface)
    {
        $this->middleware('auth:api');
        $this->middleware('checkRole:Admin')->only('index');
        $this->middleware('checkRole:Admin,Resepsionis,User')->only(['show', 'destroy']);
        $this->middleware('checkRole:User')->only('store');
        $this->middleware('checkRole:Resepsionis,Admin')->only('update');
        $this->repository = $reserveRepositoryInterface;
    }

    public function index()
    {
        return $this->repository->all();
    }

    public function show(Reserve $reserve)
    {
        return $this->repository->show($reserve);
    }

    public function store(ReserveRequest $request)
    {
        return $this->repository->store($request);
    }

    public function update(ReserveRequest $request, Reserve $reserve)
    {
        return $this->repository->update($request, $reserve);
    }

    public function destroy(Reserve $reserve)
    {
        return $this->repository->destroy($reserve);
    }
}
