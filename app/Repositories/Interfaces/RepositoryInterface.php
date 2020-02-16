<?php

namespace App\Repositories\Interfaces;

interface RepositoryInterface
{
    public function getCacheKey(string $cache, string $key);
    public function getTTL(int $ttl);
    public function forgetCache(array $cache);
    public function respond($cache);
    public function responseSuccess($message = 'Success.');
    public function responseWithData($data);
    public function responseWithToken($token);
    public function responseResourceCreated(string $message = 'Resource created.');
    public function responseUnauthorized(string $errors = 'Unauthorized.');
    public function responseUnprocessable(string $errors);
    public function responseServerError(string $errors = 'Server error.');
}
