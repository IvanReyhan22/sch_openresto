<?php

namespace App\Http\Middleware;

use Closure;

class CheckForUpdateRestoran
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $param = $request->route('restoran');
        if ($request->user()->canUpdate($param)) {
            return $next($request);
        }
        return response()->json([
            'errors' => 'Unauthorized'
        ], 401);
    }
}
