<?php

namespace App\Repositories;

use App\Menu;
use App\Restoran;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use App\Repositories\Interfaces\MenuRepositoryInterface;

class MenuRepository extends Repository implements MenuRepositoryInterface
{

    public function all()
    {
        $data = $this->cacheAll();
        return $this->responseWithData($data);
    }

    public function cacheAll()
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getTTL(15),
            function () {
                return Menu::orderBy('kategori_id', 'ASC')->get()->map->format("all");
            }
        );
    }

    public function getRules($method)
    {
        switch ($method) {
            case 'POST':
                return [
                    'nama' => 'required|string',
                    'deskripsi' => 'required|string',
                    'harga' => 'required|numeric',
                    'kategori_id' => 'required|numeric',
                    'restoran_id' => 'required|numeric',
                    'foto[]' => 'image',
                    'status' => 'numeric'
                ];
                break;
            case 'PUT':
                return [
                    'nama' => 'sometimes|required|string',
                    'deskripsi' => 'sometimes|required|string',
                    'harga' => 'sometimes|required|numeric',
                    'kategori_id' => 'sometimes|required|numeric',
                    'foto[]' => 'sometimes|image',
                    'status' => 'sometimes|numeric'
                ];
                break;
            default:
                break;
        }
    }

    public function store(Request $request)
    {
        $request->validate($this->getRules('POST'));
        $menu = $request->except('restoran_id');
        if ($request->has('foto')) {
            $name = Str::slug($menu['nama']);
            $slug = Str::slug(Restoran::find($request->restoran_id)->pluck('nama'));
            $menu = storeFile($menu, 'foto', $slug, 'menu', $menu['kategori_id'] . "-$name", 'multiple');
        }
        Menu::create($menu);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey("RESTORAN", "{$request->restoran_id}.with.kategori.menu")
        ])->cacheAll();
        return $this->responseResourceCreated('Menu berhasil ditambah');
    }

    public function show(Menu $menu)
    {
        $data = $this->cacheShow($menu);
        return $this->responseWithData($data);
    }

    public function cacheShow(Menu $menu)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$menu->id}"),
            $this->getTTL(15),
            function () use ($menu) {
                return $menu->format(null);
            }
        );
    }

    public function update(Request $request, Menu $menu)
    {
        $request->validate($this->getRules('PUT'));
        $update = $request->all();
        if ($request->has('foto')) {
            Storage::delete(str_replace('/storage', '/public', explode(', ', $menu->foto)));
            $name = Str::slug($update['nama'] ?? $menu->nama);
            $slug = Str::slug(Restoran::find($menu->restoran_id)->pluck('nama'));
            $update = storeFile($update, 'foto', $slug, 'menu', $update['kategori_id'] . "-$name", 'multiple');
        }
        $menu->update($update);
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$menu->id}"),
            $this->getCacheKey("RESTORAN", "{$menu->kategori->restoran_id}.with.kategori.menu")
        ])->cacheAll();
        $this->cacheShow($menu);
        return $this->responseSuccess('Menu berhasil diubah');
    }

    public function destroy(Menu $menu)
    {
        if (count($menu->reserve) > 0) {
            return $this->responseUnprocessable("Menu terdapat pada beberapa transaksi");
        }
        Storage::deleteDirectory(
            'public/' . Str::slug($menu->kategori->restoran->nama . "/" .  Str::slug($menu->nama))
        );
        $this->respond([
            $this->getCacheKey(self::CACHE, 'all'),
            $this->getCacheKey(self::CACHE, "show.{$menu->id}"),
            $this->getCacheKey("RESTORAN", "{$menu->kategori->restoran_id}.with.kategori.menu")
        ]);
        $menu->delete();
        $this->cacheAll();
        return $this->responseSuccess('Menu berhasil dihapus');
    }
}
