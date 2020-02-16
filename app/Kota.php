<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kota extends Model
{
    protected $table = 'kota';

    protected $fillable = [
        'provinsi_id',
        'nama'
    ];

    public function provinsi()
    {
        return $this->belongsTo(
            Provinsi::class,
            'provinsi_id'
        );
    }

    public function restoran()
    {
        return $this->hasMany(Restoran::class);
    }

    public function format($method)
    {
        switch ($method) {
            case 'regular':
                return [
                    'nama' => $this->nama
                ];
                break;
            case 'format':
                return [
                    'nama' => $this->nama . ", " . $this->provinsi->nama
                ];
                break;
            default:
                break;
        }
    }
}
