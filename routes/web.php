<?php

use App\Http\Controllers\Admin\ManagementUserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('management-users', [ManagementUserController::class, 'index'])->name('management-users');

    Route::post('/users', [ManagementUserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [ManagementUserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [ManagementUserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

//make api route login
Route::post('/api/login', [AuthController::class, 'login'])->name('api.login');



