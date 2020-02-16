<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\Crud;
use App\Rating;
use App\Repositories\Interfaces\RatingRepositoryInterface;

class RatingController extends Controller
{
    use Crud;

    public function __construct(RatingRepositoryInterface $ratingRepositoryInterface, Rating $rating)
    {
        $this->middleware('auth:api')->except(['index', 'show']);
        $this->middleware('checkRole:User')->only(['store', 'update']);
        $this->middleware('checkRole:User,SuperAdmin')->only('destroy');
        $this->repository = $ratingRepositoryInterface;
        $this->model = $rating;
    }
}
