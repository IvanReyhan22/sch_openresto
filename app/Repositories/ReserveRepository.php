<?php

namespace App\Repositories;

use App\Meja;
use App\Menu;
use App\Repositories\Interfaces\ReserveRepositoryInterface;
use App\Reserve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class ReserveRepository extends Repository implements ReserveRepositoryInterface
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
            $this->getCacheKey(self::CACHE, "all.{$this->user->restoran_id}"),
            $this->getTTL(15),
            function () {
                return Reserve::where('restoran_id', $this->user->restoran_id)
                    ->orderBy('created_at', 'DESC')
                    ->get()
                    ->map
                    ->format();
            }
        );
    }

    public function getNoTransaksi(Request $request)
    {
        $data = Reserve::where('restoran_id', $request->restoran_id)->latest()->first();
        $identifier = "{$request->restoran_id}-" . date('ymd') . "-001";
        if (isset($data)) {
            $array = explode('-', $data->no_transaksi);
            if ($array[1] == date('ymd')) {
                $identifier = "{$data->restoran_id}-" . date('ymd') . '-' . sprintf('%03d', $array[2] + 1);
            }
        }
        return $identifier;
    }

    public function getMenu(Request $request)
    {
        $data = $request->only(['menu_id', 'qty']);
        $noTransaksi = $this->getNoTransaksi($request);
        $id = explode(', ', implode(', ', $data['menu_id']));
        $qty = explode(', ', implode(', ', $data['qty']));
        $menu = Menu::whereIn('id', $id)->get()->toArray();
        $harga = array_column($menu, 'harga');
        $array = [];
        for ($i = 0; $i < count($id); $i++) {
            $array[$id[$i]]['no_transaksi'] = $noTransaksi;
            $array[$id[$i]]['qty'] = $qty[$i];
            $array[$id[$i]]['subtotal'] = $harga[$i] * $qty[$i];
        }
        return $array;
    }

    public function getMeja(Request $request)
    {
        $data = $request->only('meja_id');
        $noTransaksi = $this->getNoTransaksi($request);
        $id = explode(', ', implode(', ', $data['meja_id']));
        $meja = Meja::whereIn('id', $id)->get()->toArray();
        $harga = array_column($meja, 'harga');
        $array = [];
        for ($i = 0; $i < count($id); $i++) {
            $array[$id[$i]]['no_transaksi'] = $noTransaksi;
            $array[$id[$i]]['subtotal'] = $harga[$i];
        }
        return $array;
    }

    public function getData(Request $request, array $data, array $meja, ?array $menu = null)
    {
        $data['no_transaksi'] = $this->getNoTransaksi($request);
        $data['user_id'] = $this->user->id;
        $totalMeja = array_sum(array_column($meja, 'subtotal'));
        $totalMenu = ($menu) ? array_sum(array_column($menu, 'subtotal')) : 0;
        $data['total_harga'] = $totalMeja + $totalMenu;
        $data['paid'] = ($this->user->saldo < $data['total_harga']) ? 0 : $data['total_harga'];
        $data['status'] = ($data['paid'] > 0) ? "Paid" : "Not Paid";
        return $data;
    }

    public function store(Request $request)
    {
        $data = $request->except(['menu_id', 'qty', 'meja_id']);
        $meja = $this->getMeja($request);
        $menu = ($request->has(['menu_id', 'qty'])) ? $this->getMenu($request) : null;
        $data = $this->getData($request, $data, $meja, $menu);
        $store = Reserve::create($data);
        if ($this->user->saldo >= $store->total_harga) {
            $this->user->saldo = $this->user->saldo - $store->total_harga;
            $this->user->save();
        }
        $store->meja()->attach($meja);
        if ($menu) {
            $store->menu()->attach($menu);
        }
        $this->respond(
            [
                $this->getCacheKey(self::CACHE, "all.{$request->restoran_id}"),
                "RESTORAN.{$request->restoran_id}.WITH.MEJA"
            ]
        )->cacheAll($request->restoran_id);
        return $this->responseWithData(['no_transaksi' => $store->no_transaksi]);
    }

    public function show(Reserve $reserve)
    {
        $data = $this->cacheShow($reserve);
        return $this->responseWithData($data);
    }

    public function cacheShow(Reserve $reserve)
    {
        return Cache::remember(
            $this->getCacheKey(self::CACHE, "show.{$reserve->no_transaksi}"),
            $this->getTTL(15),
            function () use ($reserve) {
                return $reserve->format();
            }
        );
    }

    public function update(Request $request, Reserve $reserve)
    {
        $data = [];
        if ($this->user->role == "user") {
            $data['paid'] = $this->user->saldo - $reserve->total_harga;
            $data['status'] = "Paid Not Confirmed";
        }
        if ($this->user->role == "resepsionis") {
            $data['paid'] = $request->paid;
            $data['status'] = "Confirmed";
        }
        $reserve->update($data);
        $this->respond($this->getCacheKey(self::CACHE, "all.{$reserve->restoran_id}"));
        return $this->responseSuccess('Pemesanan berhasil diupdate');
    }

    public function destroy(Reserve $reserve)
    {
        $this->respond($this->getCacheKey(self::CACHE, "all.{$reserve->restoran_id}"));
        $reserve->menu()->detach();
        $reserve->meja()->detach();
        $reserve->delete();
        $this->cacheAll();
        return $this->responseSuccess('Pemesanan berhasil dihapus');
    }
}
