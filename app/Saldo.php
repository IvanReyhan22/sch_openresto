<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Saldo extends Model
{
    protected $table = "saldo";

    protected $fillable = [
        'user_id',
        'jumlah',
        'foto'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function format()
    {
        return [
            'id' => $this->id,
            'jumlah' => $this->jumlah,
            'foto' => $this->foto,
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}
