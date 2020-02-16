<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = "kategori";

    protected $fillable = [
        'restoran_id',
        'nama'
    ];

    public function menu()
    {
        return $this->hasMany(Menu::class);
    }

    public function restoran()
    {
        return $this->belongsTo(
            Restoran::class,
            'restoran_id'
        );
    }

    public function format($format)
    {
        $array = [
            'id' => $this->id,
            'nama' => $this->nama,
        ];
        if ($format == "All" || $format == "all") {
            return $array;
        } elseif ($format == "Menu" || $format == "menu") {
            return array_merge($array, ['menu' => $this->menu->map->format("kategori")]);
        }
    }
}
