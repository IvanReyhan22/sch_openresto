<?php

namespace App\Repositories;

use App\Provinsi;
use App\Repositories\Interfaces\ProvinsiRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProvinsiRepository extends Repository implements ProvinsiRepositoryInterface
{
    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember($this->getCacheKey(self::CACHE, 'all'), $this->getTTL(15), function () {
            return Provinsi::All()->map->format();
        });
    }

    public function getRules()
    {
        return [
            'nama' => 'required|string',
        ];
    }

    public function show(Provinsi $provinsi)
    {
        $data = $this->cacheShow($provinsi);
        return $this->responseWithData($data);
    }

    public function cacheShow(Provinsi $provinsi)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$provinsi->id}"),
            $this->getTTL(15),
            function () use ($provinsi) {
                return $provinsi->format();
            }
        );
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules());
        $data = $request->all();
        Provinsi::create($data);
        $this->respond($this->getCacheKey(self::CACHE, 'all'));
        return $this->responseResourceCreated('Data Provinsi berhasil ditambah');
    }

    public function update(Request $request, Provinsi $provinsi)
    {
        $request->validate($this->getRules());
        $update = $request->all();
        $provinsi->update($update);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$provinsi->id}")
        ])->cacheAll();
        $this->cacheShow($provinsi);
        return $this->responseSuccess('Data Provinsi berhasil diubah');
    }

    public function destroy(Provinsi $provinsi)
    {
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$provinsi->id}")
        ]);
        $provinsi->delete();
        $this->cacheAll();
        return $this->responseSuccess('Data Provinsi berhasil dihapus');
    }
}
