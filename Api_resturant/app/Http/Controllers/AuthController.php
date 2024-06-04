<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    //
    public function __construct(Customer $user)
    {
        // model as dependency injection
        // $this->user = $user;
    }

}
