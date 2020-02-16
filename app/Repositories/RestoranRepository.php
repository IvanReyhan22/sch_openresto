<?php

namespace App\Repositories;

use App\Kategori;
use App\User;
use App\Restoran;
use App\ViewRestoran;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use App\Repositories\Interfaces\RestoranRepositoryInterface;

class RestoranRepository extends Repository implements RestoranRepositoryInterface
{

    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember($this->getCacheKey(self::CACHE, 'all'), $this->getTTL(15), function () {
            return Restoran::orderBy('nama')->get()->map->format("all");
        });
    }

    public function getRules($method)
    {
        switch ($method) {
            case 'POST':
                return [
                    'nama' => 'required|string',
                    'alamat' => 'required|string',
                    'deskripsi' => 'string',
                    'tags' => 'string',
                    'kota_id' => 'required|numeric|exists:kota,id',
                    'foto[]' => 'image',
                    'facility[]' => 'numeric',
                    'logo' => 'required|image',
                    'jml_meja' => 'required|numeric'
                ];
                break;
            case 'PUT':
                return [
                    'nama' => 'sometimes|required|string',
                    'alamat' => 'sometimes|required|string',
                    'deskripsi' => 'sometimes|string',
                    'tags' => 'sometimes|string',
                    'kota_id' => 'sometimes|required|numeric|exists:kota,id',
                    'foto[]' => 'sometimes|image',
                    'facility[]' => 'sometimes|numeric',
                    'logo' => 'sometimes|required|image',
                    'jml_meja' => 'sometimes|required|numeric'
                ];
                break;

            default:
                break;
        }
    }

    public function search(Request $request)
    {
        $lokasi = $request->only('lokasi');
        $lokasi = explode(', ', $lokasi);
        $lokasi = [
            'kota' => $lokasi[0],
            'provinsi' => $lokasi[1]
        ];
        $data = Cache::remember(
            $this->getCacheKey(
                self::CACHE,
                "{$request->nama}." . $lokasi['kota'] . "." . $lokasi['provinsi'] . ".{$request->jml_meja}"
            ),
            $this->getTTL(15),
            function () use ($request, $lokasi) {
                ViewRestoran::where('nama', 'LIKE', '%' . $request->nama . '%')
                    ->where('nama_kota', $lokasi['kota'])
                    ->where('nama_provinsi', $lokasi['provinsi'])
                    ->where('jml_meja', '>=', $request->jml_meja)
                    ->orderBy('nama')
                    ->get();
            }
        );
        return $this->responseWithData($data);
    }

    public function show(Restoran $restoran)
    {
        $data = Cache::remember(
            $this->getCacheKey(self::CACHE, "restoran.show.{$restoran->id}"),
            $this->getTTL(15),
            function () use ($restoran) {
                return $restoran;
            }
        );
        return $this->responseWithData($data);
    }

    public function showWithMeja(Restoran $restoran)
    {
        $data = Cache::remember(
            $this->getCacheKey(self::CACHE, "{$restoran->id}.with.meja"),
            $this->getTTL(15),
            function () use ($restoran) {
                return $restoran->format("meja");
            }
        );
        return $this->responseWithData($data);
    }

    public function withMenu(Restoran $restoran)
    {
        $data = Cache::remember(
            $this->getCacheKey(self::CACHE, "{$restoran->id}.with.kategori.menu"),
            $this->getTTL(15),
            function () use ($restoran) {
                return $restoran->format("mk");
            }
        );
        return $this->responseWithData($data);
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules('POST'));
        $restoran = $request->except('facility');
        $facility = ($request->has('facility')) ? explode(', ', implode(', ', $request->facility)) : null;
        $slug = Str::slug($restoran['nama']);
        if ($request->has('foto')) {
            $restoran = storeFile(
                $restoran,
                'foto',
                $slug,
                'foto',
                $slug . '-foto',
                "multiple"
            );
        }
        if ($request->has('logo')) {
            $restoran = storeFile($restoran, 'logo', $slug, 'logo', $slug . '-logo', "single");
        }
        $store = Restoran::create($restoran);
        User::find(Auth::user()->id)->restoran()->associate($store)->save();
        if (isset($facility)) {
            $store->facility()->attach($facility);
        }
        $this->respond($this->getCacheKey(self::CACHE, 'all'))->cacheAll();
        return $this->responseResourceCreated('Restoran berhasil terdaftar');
    }

    public function update(Request $request, Restoran $restoran)
    {
        $request->validate($this->getRules('PUT'));
        $update = $request->except(['_method', 'facility']);
        $facility = ($request->has('facility')) ? explode(', ', implode(', ', $request->facility)) : null;
        $slug = Str::slug($update['nama'] ?? $restoran->nama);
        if ($request->has('foto')) {
            Storage::delete(str_replace('/storage', '/public', explode(', ', $restoran->foto)));
            $update = storeFile($update, 'foto', $slug, 'foto', $slug . '-foto', "multiple");
        }
        if ($request->has('logo')) {
            Storage::delete(str_replace('/storage', '/public', $restoran->logo));
            $update = storeFile($update, 'logo', $slug, 'logo', $slug . '-logo', "single");
        }
        $restoran->update($update);
        if (isset($facility)) {
            $restoran->facility()->sync($facility);
        }
        $this->respond($this->getCacheKey(self::CACHE, 'all'))->cacheAll();
        return $this->responseSuccess('Restoran berhasil diubah');
    }

    public function destroy(Restoran $restoran)
    {
        Storage::deleteDirectory('public/' . Str::slug($restoran->nama));
        $restoran->facility()->detach();
        $restoran->delete();
        $this->respond($this->getCacheKey(self::CACHE, 'all'))->cacheAll();
        return $this->responseSuccess('Restoran berhasil dihapus');
    }
}
