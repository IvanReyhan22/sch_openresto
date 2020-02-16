<?php

namespace App\Repositories;

use App\Repositories\Interfaces\UsersRepositoryInterface;
use App\User;
use Illuminate\Support\Facades\Cache;

class UsersRepository extends Repository implements UsersRepositoryInterface
{
    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember($this->getCacheKey(self::CACHE, 'all'), $this->getTTL(15), function () {
            return User::all();
        });
    }

    public function allResepsionis(int $id)
    {
        $data = $this->cacheAllResepsionis($id);
        return $this->responseWithData($data);
    }

    public function cacheAllResepsionis(int $id)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "all.restoran.{$id}"),
            $this->getTTL(15),
            function () use ($id) {
                return User::where('restoran_id', $id)->get();
            }
        );
    }
}
