<?php

namespace App\Repositories;

use App\Kategori;
use App\Restoran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Repositories\Interfaces\KategoriRepositoryInterface;

class KategoriRepository extends Repository implements KategoriRepositoryInterface
{

    public function all($restoran)
    {
        $data = $this->cacheAll($restoran);
        return $this->responseWithData($data);
    }

    public function cacheAll($restoran)
    {
        return Cache::remember($this->getCacheKey(self::CACHE, "all"), $this->getTTL(15), function () use ($restoran) {
            return Kategori::where('restoran_id', $restoran)->get()->map->format("all");
        });
    }

    public function getRules($method)
    {
        $array = [
            'nama' => 'required|string',
        ];
        switch ($method) {
            case 'POST':
                return array_merge(['restoran_id' => 'required|numeric',], $array);
                break;
            case 'PUT':
                return $array;
                break;
            default:
                break;
        }
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules('POST'));
        $kategori = $request->all();
        Kategori::create($kategori);
        $this->respond($this->getCacheKey(self::CACHE, 'all'))->cacheAll($request->restoran_id);
        return $this->responseResourceCreated('Kategori berhasil ditambahkan');
    }

    public function show(Kategori $kategori)
    {
        $data = $this->cacheShow($kategori);
        return $this->responseWithData($data);
    }

    public function cacheShow(Kategori $kategori)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$kategori->id}"),
            $this->getTTL(15),
            function () use ($kategori) {
                return $kategori->format('all');
            }
        );
    }

    public function update(Request $request, Kategori $kategori)
    {
        $request->validate($this->getRules('PUT'));
        $update = $request->except('_method');
        $kategori->update($update);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$kategori->id}")
        ])->cacheAll($kategori->restoran_id);
        $this->cacheShow($kategori);
        return $this->responseSuccess('Kategori berhasil diubah');
    }

    public function destroy(Kategori $kategori)
    {
        $id = $kategori->restoran_id;
        $kategori->delete();
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$id}")
        ])->cacheAll($id);
        return $this->responseSuccess('Kategori berhasil dihapus');
    }
}
