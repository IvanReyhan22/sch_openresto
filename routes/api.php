<?php

Route::name('auth.')->group(function () {
    Route::post('login', 'Api\AuthController@login')->name('login');
    Route::post('register', 'Api\AuthController@register')->name('register');
    Route::prefix('register')->name('register.')->group(function () {
        Route::post('superadmin', 'Api\AuthController@registerSuper')->name('superadmin');
        Route::post('resepsionis', 'Api\AuthController@registerResepsionis')->name('resepsionis');
    });
    Route::post('forgot-password', 'Api\ForgotPasswordController@sendPasswordResetLink')->name('forgot-password');
    Route::post('reset/password', 'Api\ForgotPasswordController@callResetPassword')->name('reset-password');
    Route::get('refresh', 'Api\AuthController@refresh')->name('refresh');
    Route::get('logout', 'Api\AuthController@logout')->name('logout');
});
Route::name('profile.')->prefix('profile')->group(function () {
    Route::get(
        '/',
        'Api\ProfileController@index'
    )->name('index');
    Route::put(
        'edit',
        'Api\ProfileController@update'
    )->name('update');
});

Route::get('user/all', 'Api\UsersController@index')->name('allUser');
Route::get('user/{id}', 'Api\UsersController@restoran')->name('allResepsionis');

Route::apiResource(
    'restoran',
    'Api\RestoranController',
    ['parameters' => [
        'restoran' => 'id'
    ]]
);

Route::prefix('restoran')->name('restoran.')->group(function () {
    Route::post('search', 'Api\RestoranController@search')->name('search');
    Route::get(
        '{restoran}/meja',
        'Api\RestoranController@showWithMeja'
    )->name('showWithMeja');
    Route::get(
        '{restoran}/kategori/menu',
        'Api\RestoranController@withMenu'
    )->name('showWithMenu');
});

Route::apiResource(
    'kategori',
    'Api\KategoriController',
    ['parameters' => [
        'kategori' => 'id'
    ]]
)->except('index');

Route::get('restoran/{id}/kategori', 'Api\KategoriController@index')->name('kategori.index');

Route::apiResource(
    'menu',
    'Api\MenuController',
    ['parameters' => [
        'menu' => 'id'
    ]]
);

Route::apiResource(
    'meja',
    'Api\MejaController',
    ['parameters' => [
        'meja' => 'id'
    ]]
);

Route::apiResource(
    'facility',
    'Api\FacilityController',
    ['parameters' => [
        'facility' => 'id'
    ]]
);

Route::apiResource(
    'reserve',
    'Api\ReserveController'
);

Route::apiResource(
    'kota',
    'Api\KotaController',
    ['parameters' => [
        'kota' => 'id'
    ]]
);

Route::apiResource(
    'provinsi',
    'Api\ProvinsiController',
    ['parameters' => [
        'provinsi' => 'id'
    ]]
);

Route::apiResource(
    'rating',
    'Api\RatingController',
    ['parameters' => [
        'rating' => 'id'
    ]]
)->except('index');

Route::get('restoran/{id}/rating', 'Api\RatingController@index')->name('rating.index');

Route::apiResource('saldo', 'Api\SaldoController')->except(['update', 'destroy']);
