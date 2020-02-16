<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reserve extends Model
{
    protected $table = "reserve";

    protected $primaryKey = "no_transaksi";

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'no_transaksi',
        'user_id',
        'restoran_id',
        'total_harga',
        'paid',
        'status',
        'mulai',
        'selesai'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function restoran()
    {
        return $this->belongsTo(Restoran::class, 'restoran_id');
    }

    public function meja()
    {
        return $this->belongsToMany(Meja::class, ReserveMeja::class, 'no_transaksi', 'meja_id')
            ->withPivot('subtotal');
    }

    public function menu()
    {
        return $this->belongsToMany(Menu::class, ReserveMenu::class, 'no_transaksi', 'menu_id')
            ->withPivot(['qty', 'subtotal']);
    }

    public function format()
    {
        return [
            'no_transaksi' => $this->no_transaksi,
            'user' => $this->user->format(),
            'restoran' => $this->restoran->format('all'),
            'total_harga' => $this->total_harga,
            'paid' => $this->paid,
            'status' => $this->status,
            'mulai-selesai' => "{$this->mulai} - {$this->selesai}",
            'meja' => $this->meja->map->format(1),
            'menu' => $this->menu->map->format('pivot')
        ];
    }
}
