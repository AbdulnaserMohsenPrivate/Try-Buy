<?php

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

Route::get('/', 'MainController@index')->name('index');
Route::get('lang/{locale}', 'MainController@lang');

Route::match(['get', 'post'], '/botman', 'BotManController@handle');



Route::get('admin', 'MainController@admin')->name('admin')->middleware('admin');

Auth::routes(['verify' => true]);

//Route::get('/home', 'HomeController@index')->name('home'); //commented as it need login to home
