<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{

    protected $fillable= [
        'id',
        'name',
        'is_admin',
        'phone',
        'email',
        'password'
    ];
    
    use HasFactory;
}
