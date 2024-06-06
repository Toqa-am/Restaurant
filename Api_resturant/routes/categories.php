<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\CategoriesController;


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

Route::group(['middleware' => 'api', 'namespace' => 'App\Http\Controllers'], function () {

    Route::get('/categories',[CategoriesController::class,'getAllCategories'] );
    Route::get('/categories/{id}', [CategoriesController::class, 'getCategoryById']);
    Route::post('/addNewCategory', [CategoriesController::class,'addNewCategory']);
    Route::put('/updateCategories/{id}', [CategoriesController::class,'updateCategory']);
    Route::delete('/deleteCategory/{id}',[CategoriesController::class,'deleteCategory']);
    

});



