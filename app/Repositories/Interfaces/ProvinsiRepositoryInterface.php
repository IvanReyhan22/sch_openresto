<?php

namespace App\Repositories\Interfaces;

use App\Provinsi;
use Illuminate\Http\Request;

interface ProvinsiRepositoryInterface
{
    const CACHE = "PROVINSI";
    public function all();
    public function cacheAll();
    public function getRules();
    public function show(Provinsi $provinsi);
    public function cacheShow(Provinsi $provinsi);
    public function store(Request $request);
    public function update(Request $request, Provinsi $provinsi);
    public function destroy(Provinsi $provinsi);
}
