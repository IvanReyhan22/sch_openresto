<?php

namespace App\Repositories\Interfaces;

interface UsersRepositoryInterface
{
    const CACHE = "USERS";
    public function all();
    public function cacheAll();
    public function allResepsionis(int $id);
    public function cacheAllResepsionis(int $id);
}
