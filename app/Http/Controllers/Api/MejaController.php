<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Meja;
use App\Repositories\Interfaces\MejaRepositoryInterface;

class MejaController extends Controller
{
    use Crud;

    public function __construct(MejaRepositoryInterface $mejaRepositoryInterface, Meja $meja)
    {
        $this->middleware(['auth:api', 'checkRole:Manager'])->except(['index', 'show']);
        $this->repository = $mejaRepositoryInterface;
        $this->model = $meja;
    }
}
