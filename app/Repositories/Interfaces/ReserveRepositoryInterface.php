<?php

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;
use App\Reserve;

interface ReserveRepositoryInterface
{
    const CACHE = "RESERVE";
    public function all();
    public function cacheAll();
    public function getData(Request $request, array $data, array $meja, array $menu = null);
    public function getNoTransaksi(Request $request);
    public function getMenu(Request $request);
    public function getMeja(Request $request);
    public function store(Request $request);
    public function show(Reserve $reserve);
    public function cacheShow(Reserve $reserve);
    public function update(Request $request, Reserve $reserve);
    public function destroy(Reserve $reserve);
}
