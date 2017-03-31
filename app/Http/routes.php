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



Route::resource('user', 'userController');
Route::resource('profil', 'profilController');
Route::resource('categorie', 'categorieController');
Route::resource('client', 'clientController');
Route::resource('produit', 'produitController');
Route::resource('visite', 'visiteController');
//Route::resource('vente', 'venteController');


Route::get('/vente', 'venteController@index');
Route::post('/vente', 'venteController@store');
Route::get('/vente/{vente}', 'venteController@show');
Route::put('/vente/{vente}', 'venteController@update');
Route::delete('/vente/{vente}', 'venteController@destroy');
Route::get('/vente/{action}/{deb}/{fin}/{user_id}', 'venteController@produit_plus_vendu_demande');
Route::get('/vente_user/{user_id}/{deb}/{fin}/{type}', 'venteController@somme_vente');
Route::get('/vente_categorie/{id}/{deb}/{fin}/{user_id}', 'venteController@vente_produit_categorie');
Route::get('/vente_graph/{user_id}/{deb}/{fin}/{type}/{produit_id}', 'venteController@vente_graph');

Route::get('/visite_best/{deb}/{fin}/{id}', 'visiteController@meilleur_client');
Route::get('/visite/{deb}/{fin}/{id}', 'visiteController@visite');
Route::get('/visite_graph/{user_id}/{deb}/{fin}/{client_id}', 'visiteController@client_graph');


