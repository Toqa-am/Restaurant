<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('admin/login', [EmployeeController::class, 'login']);
Route::get('admin/test', [EmployeeController::class, 'testMiddleware'])->middleware('auth:admin-api');
