<?php

use Illuminate\Http\Request;

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
Route::post('/editPhoto', 'VisitorController@editPhoto');
Route::resource('/visitors', 'VisitorController');
Route::resource('/categories', 'CategoryController');
Route::resource('/times', 'TimeController');
Route::resource('/courses', 'CourseController');

