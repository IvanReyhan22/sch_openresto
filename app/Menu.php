<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = "menu";

    protected $fillable = [
        'kategori_id',
        'nama',
        'deskripsi',
        'foto',
        'harga',
        'status'
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }

    public function reserve()
    {
        return $this->belongsToMany(Reserve::class, ReserveMenu::class, 'no_transaksi', 'menu_id');
    }

    public function format(string $format = null)
    {
        $array = [
            'id' => $this->id,
            'nama' => $this->nama,
            'deskripsi' => $this->deskripsi,
            'foto' => $this->foto,
            'harga' => $this->harga,
            'status' => $this->status
        ];
        if (isset($format)) {
            if ($format == "All" || $format == "all") {
                return array_merge(
                    $array,
                    [
                        'kategori' => $this->kategori->nama,
                        'restoran' => $this->kategori->restoran->nama,
                    ]
                );
            } elseif ($format == "Kategori" || $format == "kategori") {
                return $array;
            } elseif ($format == "Pivot" || $format == "pivot") {
                return array_merge(
                    $array,
                    [
                        'qty' => $this->pivot->qty,
                        'subtotal' => $this->pivot->subtotal
                    ]
                );
            }
        } else {
            return array_merge(
                $array,
                ['kategori_id' => $this->kategori_id]
            );
        }
    }
}
