<?php

namespace App\Repositories;

use App\Repositories\Interfaces\SaldoRepositoryInterface;
use App\Saldo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class SaldoRepository extends Repository implements SaldoRepositoryInterface
{
    private $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "all.{$this->user->id}"),
            $this->getTTL(15),
            function () {
                return Saldo::where('user_id', $this->user->id)->get();
            }
        );
    }

    public function store(Request $request)
    {
        $store = $request->all();
        $user = $this->user;
        $store['user_id'] = $user->id;
        if ($request->has('foto')) {
            $store = storeFile($store, 'foto', 'user', "{$this->user->id}/saldo", "{$request->jumlah}-saldo", 'single');
        }
        Saldo::create($store);
        $user->saldo = $user->saldo + $request->jumlah;
        $user->save();
        $this->respond([
            $this->getCacheKey(self::CACHE, "all.{$this->user->id}"),
            $this->getCacheKey("PROFILE", "profile.{$user->id}")
        ])->cacheAll();
        return $this->responseResourceCreated('Saldo berhasil ditambahkan');
    }

    public function show(Saldo $saldo)
    {
        $data = $this->cacheShow($saldo);
        return $this->responseWithData($data);
    }

    public function cacheShow(Saldo $saldo)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$saldo->id}"),
            $this->getTTL(15),
            function () use ($saldo) {
                return $saldo->format();
            }
        );
    }
}
