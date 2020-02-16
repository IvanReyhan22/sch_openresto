<?php

namespace App\Http\Controllers\Api;

use App\Facility;
use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Repositories\Interfaces\FacilityRepositoryInterface;

class FacilityController extends Controller
{
    use Crud;

    public function __construct(FacilityRepositoryInterface $facilityRepositoryInterface, Facility $facility)
    {
        $this->middleware('auth:api')->except(['index', 'show']);
        $this->repository = $facilityRepositoryInterface;
        $this->model = $facility;
    }
}
