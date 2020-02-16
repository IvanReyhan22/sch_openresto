<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Kota;
use App\Repositories\Interfaces\KotaRepositoryInterface;

class KotaController extends Controller
{
    use Crud;

    public function __construct(KotaRepositoryInterface $kotaRepositoryInterface, Kota $kota)
    {
        $this->middleware(['auth:api', 'checkRole:SuperAdmin'])->except(['index', 'show']);
        $this->repository = $kotaRepositoryInterface;
        $this->model = $kota;
    }
}
