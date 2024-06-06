<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\MealController;
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

Route::group(['middelware'=>'api'],function(){
    Route::get('/meals',[MealController::class,'getAllMeals']);
    Route::get('/meal/{id}', [MealController::class,'getMealById']);
    Route::post('/addmeal',[MealController::class,'addMeal']);
    Route::put('/update-meal/{id}', [MealController::class,'updateMeal']);
    Route::delete('/deletemeal/{id}',[MealController::class,'deleteMeal']);
    Route::get('/meals/category/{categoryId}',[MealController::class,'filterByCategory']);
    Route::get('/meals/type/{type}',[MealController::class,'filterByType']);    
});
