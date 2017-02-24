<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::get('/categorie', 'categorieController@index');
Route::get('/categorie/{categorie}', 'categorieController@show');
Route::put('/categorie/{categorie}', 'categorieController@update');
Route::delete('/categorie/{categorie}', 'categorieController@destroy');
Route::post('/categorie', 'categorieController@store');


Route::resource('client', 'clientController');
Route::resource('produit', 'produitController');
//Route::resource('vente', 'venteController');
Route::get('/vente', 'venteController@most');

