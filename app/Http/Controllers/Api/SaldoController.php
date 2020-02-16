<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaldoRequest;
use App\Repositories\Interfaces\SaldoRepositoryInterface;
use App\Saldo;

class SaldoController extends Controller
{
    public function __construct(SaldoRepositoryInterface $saldoRepositoryInterface)
    {
        $this->middleware(['auth:api', 'checkRole:User']);
        $this->repository = $saldoRepositoryInterface;
    }

    public function index()
    {
        return $this->repository->all();
    }

    public function store(SaldoRequest $request)
    {
        return $this->repository->store($request);
    }

    public function show(Saldo $saldo)
    {
        return $this->repository->show($saldo);
    }
}
