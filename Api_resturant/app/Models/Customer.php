<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;



class Customer extends Authenticatable implements JWTSubject
{

    use Notifiable;
    // protected $guarded=[];
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone'
    ];
    protected $hidden = [
        'password',
        
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }


    public function getJWTCustomClaims()
    {
        return [];
    }

    use HasFactory;
}
