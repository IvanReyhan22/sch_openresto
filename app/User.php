<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'foto',
        'role',
        'restoran_id',
        'saldo'
    ];

    protected $hidden = [
        'password'
    ];

    public function restoran()
    {
        return $this->belongsTo(Restoran::class, 'restoran_id');
    }

    public function reserve()
    {
        return $this->hasMany(Reserve::class);
    }

    public function saldo()
    {
        return $this->hasMany(Saldo::class);
    }

    public function hasRole($role)
    {
        return $this::where('role', $role)->get();
    }

    public function canUpdate($restoran)
    {
        return $this::where('restoran_id', $restoran)->get();
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function format()
    {
        $format =  [
            'id' => $this->id,
            'nama' => $this->name,
            'email' => $this->email,
            'foto' => $this->foto,
            'role' => $this->role,
        ];
        if ($this->role == "user") {
            return array_merge(
                $format,
                ['saldo' => $this->saldo]
            );
        } elseif ($this->role == "resepsionis" || $this->role == "admin") {
            return array_merge(
                $format,
                ['restoran' => $this->restoran->format("all")]
            );
        } else {
            return $format;
        }
    }
}
