<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Menu;
use App\Repositories\Interfaces\MenuRepositoryInterface;

class MenuController extends Controller
{
    use Crud;

    public function __construct(MenuRepositoryInterface $menuRepositoryInterface, Menu $menu)
    {
        $this->middleware('auth:api')->except(['index', 'show']);
        $this->middleware('checkRole:Admin')->only(['store', 'destroy']);
        $this->middleware('checkRole:Admin,Resepsionis')->only('update');
        $this->repository = $menuRepositoryInterface;
        $this->model = $menu;
    }
}
