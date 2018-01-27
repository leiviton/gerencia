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
Auth::routes();

Route::get('/', function () {
    return view('gerencia');
});



Route::group(['prefix'=>'api/v1','middleware' => 'auth:api'],function () {

    Route::group(['prefix'=>'admin','namespace'=>'Api\V1\Deliveryman'], function (){
        Route::get('orders','DeliverymanCheckoutController@index');
        Route::get('filters','DeliverymanCheckoutController@getOrderFiltros');
        Route::get('auth/user','DeliverymanCheckoutController@authenticated');
        Route::get('order/{id}','DeliverymanCheckoutController@show');
    });

    Route::group(['prefix' => 'admin','namespace'=>'Api\V1\Admin'],function (){
        /*pedidos*/
       Route::post('order','AdminCheckoutController@store');
       Route::post('addItem','AdminCheckoutController@addItem');
       Route::get('mesas/livres', 'AdminCheckoutController@getMesasLivre');
       Route::get('search','AdminCheckoutController@search');
       Route::post('payment','AdminCheckoutController@payment');
       Route::get('typepayment', 'AdminCheckoutController@getTypePayments');
       Route::put('order/{id}', 'AdminCheckoutController@update');
       Route::get('printer/{id}', 'AdminCheckoutController@printer');
       Route::get('printer/new/{id}', 'AdminCheckoutController@printerNewItem');
       Route::get('complements', 'AdminCheckoutController@getComplements');
       Route::get('complement/{id}', 'AdminCheckoutController@getComplement');
       Route::get('close', 'AdminCheckoutController@orders');
       /*mesas*/
       Route::get('mesas', 'MesaController@index');
        Route::get('mesas/all', 'MesaController@all');
       Route::get('mesa/{id}', 'MesaController@edit');
       Route::put('mesa/{id}','MesaController@update');
       Route::post('mesa','MesaController@store');
        /*produtos*/
       Route::get('groups','CategoriesController@index');
       Route::get('subgroups','SubgroupsController@index');
       Route::get('products', 'ProductsController@index');
       Route::get('product/{id}', 'ProductsController@edit');
       Route::post('product/store', 'ProductsController@store');
       Route::put('product/{id}', 'ProductsController@update');
       /*user*/
       Route::get('auth/logout','AuthController@logout');
       Route::get('users','UserController@index');
       Route::get('users/{id}','UserController@edit');
       Route::post('users','UserController@store');
       Route::put('users/{id}','UserController@update');
       Route::put('password/{id}','UserController@changePassword');
       Route::put('validar/{id}','UserController@valid');
       /*clients*/
       Route::get('search/client','ClientsController@search');
       Route::get('clients','ClientsController@index');
       Route::post('client', 'ClientsController@store');
       Route::get('client/{id}','ClientsController@edit');
       Route::put('client/{id}', 'ClientsController@update');
    });
    Route::get('user','Api\UserController@authenticated');
});

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
