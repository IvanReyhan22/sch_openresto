<?php

namespace App\Repositories;

use App\Kota;
use App\Repositories\Interfaces\KotaRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class KotaRepository extends Repository implements KotaRepositoryInterface
{
    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember($this->getCacheKey(self::CACHE, 'all'), $this->getTTL(15), function () {
            return Kota::All()->map->format('format');
        });
    }

    public function getRules($method)
    {
        switch ($method) {
            case 'POST':
                return [
                    'provinsi_id' => 'required|numeric|exists:provinsi,id',
                    'nama' => 'required|string',
                ];
                break;
            case 'PUT':
                return [
                    'provinsi_id' => 'sometimes|required|numeric|exists:provinsi,id',
                    'nama' => 'required|string',
                ];
                break;
            default:
                break;
        }
    }

    public function show(Kota $kota)
    {
        $data = $this->cacheShow($kota);
        return $this->responseWithData($data);
    }

    public function cacheShow(Kota $kota)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$kota->id}"),
            $this->getTTL(15),
            function () use ($kota) {
                return $kota->format('format');
            }
        );
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules('POST'));
        $data = $request->all();
        Kota::create($data);
        $this->respond($this->getCacheKey(self::CACHE, 'all'));
        return $this->responseResourceCreated('Data Kota berhasil ditambah');
    }

    public function update(Request $request, Kota $kota)
    {
        $request->validate($this->getRules('PUT'));
        $update = $request->all();
        $kota->update($update);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$kota->id}"),
        ])->cacheAll();
        return $this->responseSuccess('Data Kota berhasil diubah');
    }

    public function destroy(Kota $kota)
    {
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$kota->id}"),
        ]);
        $kota->delete();
        $this->cacheAll();
        return $this->responseSuccess('Data Kota berhasil dihapus');
    }
}
