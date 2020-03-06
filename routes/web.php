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

Route::get('/', 'HomeController@index')->name('home');

Route::group(['middleware' => ['role:Administrator']], function () {
    //ajustes
    Route::get('/ajustes/', 'HomeController@settings')->name('settings.index');
    // obtener datos ajustes horario
    Route::post('/ajustes/getData', 'ScheduleController@getData')->name('settings.getData');
    Route::post('/ajustes/saveSchedule', 'ScheduleController@saveSchedule')->name('settings.saveSchedule');
    Route::post('/ajustes/saveRestPeriod', 'RestPeriodController@saveRestPeriod')->name('settings.saveRestPeriod');
    Route::post('/ajustes/createNewRestPeriod', 'RestPeriodController@store')->name('settings.createNewRestPeriod');
    Route::post('/ajustes/deleteRestPeriod', 'RestPeriodController@delete')->name('settings.deleteRestPeriod');

    //users
    Route::get('/usuarios/', 'UserController@index')->name('users.index');
    Route::get('/usuarios/nuevo', 'UserController@create')->name('users.create');
    Route::post('/usuarios/nuevo', 'UserController@store');

    //clientes
    Route::get('/clientes/', 'ClientController@index')->name('clients.index');
    Route::get('/clientes/nuevo', 'ClientController@create')->name('clients.create');
    Route::post('/clientes/nuevo', 'ClientController@store');

    //empleadoss
    Route::get('/empleados/', 'EmployeeController@index')->name('employees.index');
    Route::get('/empleados/nuevo', 'EmployeeController@create')->name('employees.create');
    Route::post('/empleados/nuevo', 'EmployeeController@store');
    Route::get('/empleados/{id}/editar', 'EmployeeController@edit')->name('employees.edit');
    Route::post('/empleados/{id}/editar', 'EmployeeController@update');
    Route::post('/empleados/{id}/changeStatus', 'EmployeeController@changeStatus')->name('employees.changeStatus');

    //categorias
    Route::get('/categorias/', 'CategoryController@index')->name('categories.index');
    Route::post('/categorias/new', 'CategoryController@store');
    Route::post('/categorias/{id}/edit', 'CategoryController@update');

    //servicios
    Route::get('/servicios/', 'ServiceController@index')->name('services.index');
    Route::get('/servicios/nuevo', 'ServiceController@create')->name('services.create');
    Route::post('/servicios/nuevo', 'ServiceController@store');
    Route::get('/servicios/{id}/editar', 'ServiceController@edit')->name('services.edit');
    Route::post('/servicios/{id}/editar', 'ServiceController@update');
});

Route::group(['middleware' => 'auth'], function () {
    //calendario
    Route::get('/agenda/', 'HomeController@agenda')->name('agenda');
    Route::get('/agenda/new_date', 'DateController@new_date')->name('agenda.new_date');
    Route::post('/agenda/new_date/getData', 'DateController@getData')->name('agenda.getData');
    Route::post('/agenda/new_date/getScheduleDateSelected', 'ScheduleController@getScheduleDateSelected')->name('agenda.getScheduleDateSelected');
});
