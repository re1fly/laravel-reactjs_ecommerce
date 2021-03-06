<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('layouts/admin/dashboard');
});*/

/*Route::get('/{url?}', function () {
    return view('app');
})->where('', 'list');*/

/*dashboard*/
Route::get('/admin/{url?}', function () {
    return view('layouts.admin.dashboard');
});

Route::get('/{url?}', function () {
    return view('authentication.app');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

/*send email*/
Route::get('mail/send-email', 'EmailController@sendEmail');

/*DEBUG*/
Route::get('debug/testing', 'TransactionController@testing');
