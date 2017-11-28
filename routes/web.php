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
    return view('welcome');
});


Route::group(['middleware'=>'cors'],function (){
    Route::group(['prefix'=>'api/v1'],function () {

        Route::group(['prefix'=>'admin','namespace'=>'Api\V1\Deliveryman','middleware' => 'auth:api'], function (){
            Route::get('orders','DeliverymanCheckoutController@index');
            Route::get('filters','DeliverymanCheckoutController@getOrderFiltros');
            Route::get('auth/user','DeliverymanCheckoutController@authenticated');
            Route::get('order/{id}','DeliverymanCheckoutController@show');
        });

        Route::group(['prefix' => 'admin','namespace'=>'Api\V1\Admin','middleware' => 'auth:api'],function (){
           Route::post('order','AdminCheckoutController@store');
           Route::get('groups','CategoriesController@index');
           Route::get('subgroups','SubgroupsController@index');
           Route::get('products', 'ProductsController@index');
           Route::get('product/{id}', 'ProductsController@edit');
           Route::post('product/store', 'ProductsController@store');
           Route::put('product/{id}', 'ProductsController@update');
           Route::get('search','AdminCheckoutController@search');
           Route::get('mesas', 'AdminCheckoutController@getMesas');
        });
        Route::get('user','Api\UserController@authenticated');
    });
});

Route::get('/home', 'HomeController@index')->name('home');
