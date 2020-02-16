<?php

namespace App\Repositories;

use App\Facility;
use App\Repositories\Interfaces\FacilityRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FacilityRepository extends Repository implements FacilityRepositoryInterface
{
    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember($this->getCacheKey(self::CACHE, 'all'), $this->getTTL(15), function () {
            return Facility::all();
        });
    }

    public function getRules($method)
    {
        $array = [
            'icon' => 'required|string',
            'nama' => 'required|string'
        ];
        switch ($method) {
            case 'POST':
                return $array;
                break;
            case 'PUT':
                return str_replace('required', 'sometimes|required', $array);
                break;
            default:
                break;
        }
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules('POST'));
        $facility = $request->all();
        Facility::create($facility);
        $this->respond($this->getCacheKey(self::CACHE, 'all'))->cacheAll();
        return $this->responseResourceCreated('Fasilitas berhasil ditambah');
    }

    public function show(Facility $facility)
    {
        $data = $this->cacheShow($facility);
        return $this->responseWithData($data);
    }

    public function cacheShow(Facility $facility)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$facility->id}"),
            $this->getTTL(15),
            function () use ($facility) {
                return $facility;
            }
        );
    }

    public function update(Request $request, Facility $facility)
    {
        $request->validate($this->getRules('PUT'));
        $update = $request->all();
        $facility->update($update);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$facility->id}")
        ])->cacheAll();
        $this->cacheShow($facility);
        return $this->responseSuccess('Fasilitas berhasil diubah');
    }

    public function destroy(Facility $facility)
    {
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$facility->id}")
        ]);
        $facility->delete();
        $this->cacheAll();
        return $this->responseSuccess('Fasilitas berhasil dihapus');
    }
}
