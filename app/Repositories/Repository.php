<?php

namespace App\Repositories;

use App\Repositories\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class Repository implements RepositoryInterface
{
    public function getCacheKey(string $cache, string $key)
    {
        return "$cache." . strtoupper($key);
    }

    public function forgetCache(array $cache)
    {
        for ($i = 0; $i < count($cache); $i++) {
            if (Cache::has($cache[$i])) {
                Cache::forget($cache[$i]);
            }
        }
        return $this;
    }

    public function getTTL(int $ttl)
    {
        return Carbon::now()->addMinutes($ttl);
    }

    public function respond($cache)
    {
        $this->forgetCache(Arr::wrap($cache));
        return $this;
    }

    public function responseSuccess($message = 'Success.')
    {
        return response()->json([
            'status' => 200,
            'message' => $message,
        ], 200);
    }

    public function responseWithData($data)
    {
        return response()->json($data, 200);
    }

    public function responseWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

    public function responseResourceCreated(string $message = 'Resource created.')
    {
        return response()->json([
            'status' => 201,
            'message' => $message,
        ], 201);
    }

    public function responseUnauthorized(string $errors = 'Unauthorized.')
    {
        return response()->json([
            'status' => 401,
            'errors' => $errors,
        ], 401);
    }

    public function responseUnprocessable(string $errors)
    {
        return response()->json([
            'status' => 422,
            'errors' => $errors,
        ], 422);
    }

    public function responseServerError(string $errors = 'Server error.')
    {
        return response()->json([
            'status' => 500,
            'errors' => $errors
        ], 500);
    }
}
