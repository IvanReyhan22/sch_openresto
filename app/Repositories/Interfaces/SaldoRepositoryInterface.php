<?php

namespace App\Repositories\Interfaces;

use App\Saldo;
use Illuminate\Http\Request;

interface SaldoRepositoryInterface
{
    const CACHE = "SALDO";
    public function all();
    public function cacheAll();
    public function store(Request $request);
    public function show(Saldo $saldo);
    public function cacheShow(Saldo $saldo);
}
