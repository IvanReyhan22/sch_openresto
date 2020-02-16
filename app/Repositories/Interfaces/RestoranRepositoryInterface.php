<?php

namespace App\Repositories\Interfaces;

use App\Restoran;
use Illuminate\Http\Request;

interface RestoranRepositoryInterface
{
    const CACHE = "RESTORAN";
    public function all();
    public function cacheAll();
    public function getRules($method);
    public function search(Request $request);
    public function show(Restoran $restoran);
    public function showWithMeja(Restoran $restoran);
    public function withMenu(Restoran $restoran);
    public function store(Request $request);
    public function update(Request $request, Restoran $restoran);
    public function destroy(Restoran $restoran);
}
