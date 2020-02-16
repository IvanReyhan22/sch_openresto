<?php

namespace App\Repositories;

use App\Repositories\Interfaces\ProfileRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ProfileRepository extends Repository implements ProfileRepositoryInterface
{
    private $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function profile()
    {
        $data = $this->cacheProfile();
        return $this->responseWithData($data);
    }

    public function cacheProfile()
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "profile.{$this->user->id}"),
            $this->getTTL(15),
            function () {
                return $this->user->format();
            }
        );
    }

    public function update(Request $request)
    {
        $user = $this->user;
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('foto')) {
            if ($user->foto) {
                Storage::delete(str_replace('/storage', '/public', $user->foto));
            }
            $user->foto = $this->storePhoto($request);
        }
        if ($request->has(['old_password', 'new_password'])) {
            $user->password = bcrypt($request->new_password);
        }
        $user->save();
        $this->respond($this->getCacheKey(self::CACHE, "profile.{$user->id}"))->cacheProfile();
        return $this->responseSuccess('Profil berhasil diubah');
    }

    public function storePhoto(Request $request)
    {
        $data = $request->only('foto');
        $slug = Str::slug($request->nama);
        $data = storeFile($data, 'foto', 'user', "{$this->user->id}/profile", "{$slug}-photo", 'single');
        return $data['foto'];
    }
}
