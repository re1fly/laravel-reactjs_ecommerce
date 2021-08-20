<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/signup", "UserController@signUp");
Route::post("/signin", "UserController@signIn");
Route::get("/user/{email}", "UserController@userDetail");

Route::post("/upload-clothes", "ClothController@createClothes");

Route::get("/men-clothes", "ClothController@getMenClothes");
Route::get("/men-new-arrivals", "ClothController@getMenNewArrivals");

Route::get("/women-clothes", "ClothController@getWomenClothes");
Route::get("/women-new-arrivals", "ClothController@getWomenNewArrivals");

Route::get("/kids-clothes", "ClothController@getKidsClothes");
Route::get("/kids-new-arrivals", "ClothController@getKidsNewArrivals");



