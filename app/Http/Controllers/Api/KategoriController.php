<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Kategori;
use App\Repositories\Interfaces\KategoriRepositoryInterface;

class KategoriController extends Controller
{
    use Crud;

    public function __construct(KategoriRepositoryInterface $kategoriRepositoryInterface, Kategori $kategori)
    {
        $this->middleware(['auth:api', 'checkRole:Manager'])->except(['index', 'show']);
        $this->repository = $kategoriRepositoryInterface;
        $this->model = $kategori;
    }
}
