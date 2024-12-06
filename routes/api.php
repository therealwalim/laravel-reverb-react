<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('notifications', NotificationController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/', function () {
    return response()->json(['message' => 'Hello World']);
});

Route::fallback(function (){
    abort(404, 'API resource not found');
});