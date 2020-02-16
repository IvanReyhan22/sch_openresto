<?php

namespace App\Repositories\Interfaces;

use App\Kota;
use Illuminate\Http\Request;

interface KotaRepositoryInterface
{
    const CACHE = "KOTA";
    public function all();
    public function cacheAll();
    public function getRules($method);
    public function show(Kota $kota);
    public function cacheShow(Kota $kota);
    public function store(Request $request);
    public function update(Request $request, Kota $kota);
    public function destroy(Kota $kota);
}
