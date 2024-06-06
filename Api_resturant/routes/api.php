<?php

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\CustomerController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//namespace for new folder "Controllers\Api"

Route::group(['middleware' => 'api', 'namespace' => 'App\Http\Controllers\Api'], function () {

    Route::get('categories', 'CategoriesController@getAllCategories');
    Route::get('/categories/{id}', 'CategoriesController@getCategoryById');
    Route::post('/addNewCategory', 'CategoriesController@addNewCategory');
    Route::put('/updateCategories/{id}', 'CategoriesController@updateCategory');
    Route::delete('/deleteCategory/{id}','CategoriesController@deleteCategory');
    

});

<<<<<<< HEAD


=======
Route::group(['middleware' => 'auth:api'], function() {
    // Protected routes// test authentication 
    Route::get('test',[CustomerController::class,'test']);
});
Route::post('auth/register', [CustomerController::class, 'register']);
Route::post('auth/login', [CustomerController::class, 'login']);
Route::post('auth/verify-user-email',[CustomerController::class,'verifyCustomerEmail']);
Route::post('auth/resend-email-verification-link',[CustomerController::class,'resendVerificationEmailLink']);
>>>>>>> Ahmed
