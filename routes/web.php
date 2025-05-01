<?php

use App\Http\Controllers\Admin\ManagementUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\ManagementSeminarController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login');
})->name('home');

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('management-users', [ManagementUserController::class, 'index'])->name('management-users');

    Route::post('/users', [ManagementUserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [ManagementUserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [ManagementUserController::class, 'destroy'])->name('users.destroy');

    Route::get('management-seminars', [ManagementSeminarController::class, 'index'])->name('management-seminars');

    Route::post('/seminars', [ManagementSeminarController::class, 'store'])->name('seminars.store');
    Route::put('/seminars/{seminar}', [ManagementSeminarController::class, 'update'])->name('seminars.update');
    Route::delete('/seminars/{seminar}', [ManagementSeminarController::class, 'destroy'])->name('seminars.destroy');
});

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/seminars', [UserController::class, 'list'])->name('seminars.list');
    Route::get('/seminars/history', [UserController::class, 'history'])->name('seminars.history');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

//make api route login
Route::post('/api/login', [AuthController::class, 'login'])->name('api.login');



