<?php

namespace App\Repositories\Interfaces;

use App\Menu;
use Illuminate\Http\Request;

interface MenuRepositoryInterface
{
    const CACHE = "MENU";
    public function all();
    public function cacheAll();
    public function getRules($method);
    public function store(Request $request);
    public function show(Menu $menu);
    public function cacheShow(Menu $menu);
    public function update(Request $request, Menu $menu);
    public function destroy(Menu $menu);
}
