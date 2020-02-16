<?php

namespace App\Repositories\Interfaces;

use App\Facility;
use Illuminate\Http\Request;

interface FacilityRepositoryInterface
{
    const CACHE = "FACILITY";
    public function all();
    public function cacheAll();
    public function getRules($method);
    public function store(Request $request);
    public function show(Facility $facility);
    public function cacheShow(Facility $facility);
    public function update(Request $request, Facility $facility);
    public function destroy(Facility $facility);
}
