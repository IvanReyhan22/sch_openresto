<?php

namespace App\Repositories;

use App\Meja;
use App\Repositories\Interfaces\MejaRepositoryInterface;
use App\Restoran;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class MejaRepository extends Repository implements MejaRepositoryInterface
{

    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember($this->getCacheKey(self::CACHE, 'all'), $this->getTTL(15), function () {
            return Meja::orderBy('restoran_id', 'ASC')->get()->map->format();
        });
    }

    public function getRules($method)
    {
        switch ($method) {
            case 'POST':
                return [
                    'restoran_id' => 'required|numeric',
                    'no_meja' => 'required|numeric',
                    'foto[]' => 'image',
                    'status' => 'required|string',
                    'kapasitas' => 'required|numeric',
                    'harga' => 'required|numeric'
                ];
                break;
            case 'PUT':
                return [
                    'no_meja' => 'sometimes|required|numeric',
                    'foto[]' => 'sometimes|image',
                    'status' => 'sometimes|required|string',
                    'kapasitas' => 'sometimes|required|numeric',
                    'harga' => 'sometimes|required|numeric'
                ];
                break;
            default:
                break;
        }
    }

    public function show(Meja $meja)
    {
        $data = $this->cacheShow($meja);
        return $this->responseWithData($data);
    }

    public function cacheShow(Meja $meja)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$meja->id}"),
            $this->getTTL(15),
            function () use ($meja) {
                return $meja->format();
            }
        );
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules('POST'));
        $store = $request->all();
        if ($request->has('foto')) {
            $slug = Str::slug(Restoran::find($store['restoran_id'])->pluck('nama'));
            $store = storeFile($store, 'foto', $slug, 'meja', "{$slug}-meja_no-{$store['no_meja']}", "multiple");
        }
        Meja::create($store);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey('RESTORAN', "{$request->restoran_id}.with.meja")
        ])->cacheAll();
        return $this->responseResourceCreated('Meja berhasil ditambah');
    }

    public function update(Request $request, Meja $meja)
    {
        $request->validate($this->getRules('PUT'));
        $update = $request->except('_method');
        if ($request->has('foto')) {
            $slug = Str::slug($meja->restoran->nama);
            Storage::delete(str_replace('/storage', '/public', $meja->foto));
            $update = storeFile($update, 'foto', $slug, 'meja', "{$slug}-meja_no-{$update['no_meja']}", "multiple");
        }
        $meja->update($update);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$meja->id}"),
            $this->getCacheKey('RESTORAN', "{$meja->restoran_id}.with.meja")
        ])->cacheAll();
        $this->cacheShow($meja);
        return $this->responseSuccess('Meja berhasil diubah');
    }

    public function destroy(Meja $meja)
    {
        if (count($meja->reserve) > 0) {
            return $this->responseUnprocessable('Pernah dibooking sebelumnya, hapus reservasi terlebih dahulu');
        }
        Storage::delete(explode(', ', str_replace('/storage', '/public', $meja->foto)));
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$meja->id}"),
            $this->getCacheKey('RESTORAN', "{$meja->restoran_id}.with.meja")
        ]);
        $meja->delete();
        $this->cacheAll();
        return $this->responseSuccess('Meja berhasil dihapus');
    }
}
