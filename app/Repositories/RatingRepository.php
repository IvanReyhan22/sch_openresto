<?php

namespace App\Repositories;

use App\Rating;
use App\Repositories\Interfaces\RatingRepositoryInterface;
use App\Restoran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class RatingRepository extends Repository implements RatingRepositoryInterface
{
    private $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function all($restoran)
    {
        $data = $this->cacheAll($restoran);
        return $this->responseWithData($data);
    }

    public function cacheAll($restoran)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getTTL(15),
            function () use ($restoran) {
                return Rating::where('restoran_id', $restoran)->get();
            }
        );
    }

    public function getRules($method)
    {
        switch ($method) {
            case 'POST':
                return [
                    'restoran_id' => 'required|numeric|exists:restoran,id',
                    'rating' => 'required',
                    'deskripsi' => 'string',
                    'foto' => 'image'
                ];
                break;
            case 'PUT':
                return [
                    'rating' => 'sometimes|required',
                    'deskripsi' => 'sometimes|string',
                    'foto' => 'sometimes|image'
                ];
                break;
            default:
                break;
        }
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules('POST'));
        $data = $request->all();
        $data['user_id'] = $this->user->id;
        if ($request->has('foto')) {
            $slug = Str::slug(Restoran::find($request->restoran_id)->pluck('nama'));
            $data = storeFile(
                $data,
                'foto',
                $slug,
                'rating',
                "{$slug}-rating-{$data['user_id']}",
                'single'
            );
        }
        Rating::create($data);
        $this->respond($this->getCacheKey(self::CACHE, 'all'))->cacheAll($request->restoran_id);
        return $this->responseResourceCreated('Rating berhasil ditambahkan');
    }

    public function show(Rating $rating)
    {
        $data = $this->cacheShow($rating);
        return $this->responseWithData($data);
    }

    public function cacheShow(Rating $rating)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$rating->id}"),
            $this->getTTL(15),
            function () use ($rating) {
                return $rating;
            }
        );
    }

    public function update(Request $request, Rating $rating)
    {
        $request->validate($this->getRules('PUT'));
        $update = $request->all();
        $update['user_id'] = $this->update->id;
        if ($request->has('foto')) {
            Storage::delete(str_replace('/storage', '/public', $rating->foto));
            $slug = Str::slug(Restoran::find($rating->restoran_id)->pluck('nama'));
            $update = storeFile(
                $update,
                'foto',
                $slug,
                'rating',
                "{$slug}-rating-{$update['user_id']}",
                'single'
            );
        }
        $rating->update($update);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$rating->id}")
        ])->cacheAll($rating->restoran_id);
        return $this->responseSuccess('Rating berhasil diubah');
    }

    public function destroy(Rating $rating)
    {
        $id = $rating->restoran_id;
        Storage::delete(str_replace('/storage', '/public', $rating->foto));
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$rating->id}")
        ]);
        $rating->delete();
        $this->cacheAll($id);
        return $this->responseSuccess('Rating berhasil dihapus');
    }
}
