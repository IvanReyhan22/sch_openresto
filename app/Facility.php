<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $table = "facility";

    protected $fillable = [
        'nama',
        'icon'
    ];

    public function restoran()
    {
        return $this->belongsToMany(
            Restoran::class,
            RestoranFacility::class,
            'restoran_id',
            'facility_id'
        );
    }
}
