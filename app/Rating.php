<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $table = "rating";

    protected $fillable = [
        'restoran_id',
        'user_id',
        'rating',
        'deskripsi',
        'foto'
    ];

    public function restoran()
    {
        return $this->belongsTo(
            Restoran::class,
            'restoran_id'
        );
    }

    public function user()
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }
}
