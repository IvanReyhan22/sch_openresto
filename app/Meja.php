<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meja extends Model
{
    protected $table = "meja";

    protected $fillable = [
        'restoran_id',
        'no_meja',
        'kapasitas',
        'foto',
        'status',
        'harga'
    ];

    public function restoran()
    {
        return $this->belongsTo(Restoran::class, 'restoran_id');
    }

    public function reserve()
    {
        return $this->belongsToMany(Reserve::class, ReserveMeja::class, 'no_transaksi', 'meja_id');
    }

    public function format($pivot = null)
    {
        $format = [
            'meja_id' => $this->id,
            'no_meja' => $this->no_meja
        ];
        if (isset($pivot)) {
            return array_merge(
                $format,
                ['subtotal' => $this->pivot->subtotal]
            );
        }
        return array_merge(
            $format,
            [
                'foto' => $this->foto,
                'status' => $this->status,
                'kapasitas' => $this->kapasitas,
                'harga' => $this->harga
            ]
        );
    }
}
