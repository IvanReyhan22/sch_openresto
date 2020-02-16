<?php

namespace App\Repositories\Interfaces;

use App\Kategori;
use Illuminate\Http\Request;

interface KategoriRepositoryInterface
{
    const CACHE = "KATEGORI";
    public function all($restoran);
    public function cacheAll($restoran);
    public function getRules($method);
    public function store(Request $request);
    public function show(Kategori $kategori);
    public function cacheShow(Kategori $kategori);
    public function update(Request $request, Kategori $kategori);
    public function destroy(Kategori $kategori);
}
