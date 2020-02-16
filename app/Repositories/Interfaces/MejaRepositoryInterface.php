<?php

namespace App\Repositories\Interfaces;

use App\Meja;
use Illuminate\Http\Request;

interface MejaRepositoryInterface
{
    const CACHE = "MEJA";
    public function all();
    public function cacheAll();
    public function getRules($method);
    public function show(Meja $meja);
    public function cacheShow(Meja $meja);
    public function store(Request $request);
    public function update(Request $request, Meja $meja);
    public function destroy(Meja $meja);
}
