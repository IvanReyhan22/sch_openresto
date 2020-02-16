<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Provinsi;
use App\Repositories\Interfaces\ProvinsiRepositoryInterface;

class ProvinsiController extends Controller
{
    use Crud;

    public function __construct(ProvinsiRepositoryInterface $provinsiRepositoryInterface, Provinsi $provinsi)
    {
        $this->middleware(['auth:api', 'checkRole:SuperAdmin'])->except(['index', 'show']);
        $this->repository = $provinsiRepositoryInterface;
        $this->model = $provinsi;
    }
}
