<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middelware'=>'api','namespace'=>'App\Http\Controllers\Api'],function(){
    Route::get('/meals','MealController@getAllMeals');
    Route::get('/meal/{id}', 'MealController@getMealById');
    Route::post('/addmeal', 'MealController@addMeal');
    Route::put('/update-meal/{id}', 'MealController@updateMeal');
    Route::delete('/deletemeal/{id}','MealController@deleteMeal');
    Route::get('/meals/category/{categoryId}','MealController@filterByCategory');
    Route::get('/meals/type/{type}','MealController@filterByType');    
});
