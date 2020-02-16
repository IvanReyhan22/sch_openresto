<?php

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;

interface ProfileRepositoryInterface
{
    const CACHE = "PROFILE";
    public function profile();
    public function cacheProfile();
    public function update(Request $request);
    public function storePhoto(Request $request);
}
