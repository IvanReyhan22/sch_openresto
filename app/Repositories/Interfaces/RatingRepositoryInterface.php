<?php

namespace App\Repositories\Interfaces;

use App\Rating;
use Illuminate\Http\Request;

interface RatingRepositoryInterface
{
    const CACHE = "RATING";
    public function all($restoran);
    public function cacheAll($restoran);
    public function getRules($method);
    public function store(Request $request);
    public function show(Rating $rating);
    public function cacheShow(Rating $rating);
    public function update(Request $request, Rating $rating);
    public function destroy(Rating $rating);
}
