<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restoran extends Model
{
    protected $table = "restoran";

    protected $fillable = [
        'nama',
        'alamat',
        'kota_id',
        'tags',
        'deskripsi',
        'logo',
        'foto',
        'jml_meja',
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function rating()
    {
        return $this->hasMany(Rating::class);
    }

    public function meja()
    {
        return $this->hasMany(Meja::class);
    }

    public function kategori()
    {
        return $this->hasMany(Kategori::class);
    }

    public function kota()
    {
        return $this->belongsTo(Kota::class, 'kota_id');
    }

    public function facility()
    {
        return $this->belongsToMany(
            Facility::class,
            RestoranFacility::class,
            'restoran_id',
            'facility_id'
        );
    }

    public function reserve()
    {
        return $this->hasMany(Reserve::class);
    }

    public function format($format)
    {
        $kota = "{$this->kota->nama}, {$this->kota->provinsi->nama}";
        $array = [
            'id' => $this->id,
            'nama' => $this->nama,
            'tags' => $this->tags,
            'alamat' => "{$this->alamat}, {$kota}",
            'logo' => $this->logo,
            'foto' => $this->foto,
        ];
        $meja = ['meja' => $this->meja->map->format()];
        $kategori = ['kategori' => $this->kategori->map->format("menu")];
        if ($format == "All" || $format == "all") {
            return $array;
        } elseif ($format == "Meja" || $format == "meja") {
            return array_merge($array, $meja);
        } elseif ($format == "MK" || $format == "mk") {
            return array_merge($array, $kategori);
        }
    }
}
