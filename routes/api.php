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

Route::post("/upload-product", "ClothController@createClothes");
Route::post("/update-product/{id}", "ClothController@updateClothes");
Route::delete("/delete-product/{id}", "ClothController@deleteClothes");

Route::get("/all-product", "ClothController@getAllClothes");
Route::get("/get-product/{id}", "ClothController@getCloth");

Route::get("/men-clothes", "ClothController@getMenClothes");
Route::get("/men-new-arrivals", "ClothController@getMenNewArrivals");

Route::get("/women-clothes", "ClothController@getWomenClothes");
Route::get("/women-new-arrivals", "ClothController@getWomenNewArrivals");

Route::get("/kids-clothes", "ClothController@getKidsClothes");
Route::get("/kids-new-arrivals", "ClothController@getKidsNewArrivals");

Route::get("/tshirts", "ClothController@getTshirts");
Route::get("/jerseys", "ClothController@getJerseys");
Route::get("/jackets", "ClothController@getJackets");
Route::get("/sweaters", "ClothController@getSweaters");
Route::get("/hoodies", "ClothController@getHoodies");
Route::get("/shorts", "ClothController@getShorts");
Route::get("/pants", "ClothController@getPants");
Route::get("/leggings", "ClothController@getLeggings");
Route::get("/socks", "ClothController@getSocks");
Route::get("/caps", "ClothController@getCaps");
Route::get("/backpacks", "ClothController@getBackpacks");
Route::get("/sleeves", "ClothController@getSleeves");
Route::get("/balls", "ClothController@getBalls");

Route::post("/create-transaction", "TransactionController@createtransactions");



