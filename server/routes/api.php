<?php

use App\Http\Controllers\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mahasiswa/get',[Mahasiswa::class,'getController']);

// buat route untuk pencarian
Route::get('/mahasiswa/search/{keyword}',[Mahasiswa::class,'searchController']);

// buat route untuk detail data
Route::get('/mahasiswa/detail/{id}',[Mahasiswa::class,'detailController']);

// buat route untuk hapus data
Route::delete('/mahasiswa/delete/{id}',[Mahasiswa::class,'deleteController']);

// buat route untuk simpan data
Route::post('/mahasiswa/save',[Mahasiswa::class,'saveController']);

// buat route untuk ubah data
Route::put('/mahasiswa/update/{id}',[Mahasiswa::class,'updateController']);

