<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model
{
    protected $table = 'provinsi';

    protected $fillable = [
        'nama'
    ];

    public function kota()
    {
        return $this->hasMany(Kota::class);
    }

    public function format()
    {
        return [
            'nama' => $this->nama,
            'kota' => $this->kota->map->format('regular')
        ];
    }
}
