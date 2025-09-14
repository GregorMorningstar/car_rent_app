<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ModeratorController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/blog/create', [BlogController::class, 'create'])->name('admin.blog.create');
    Route::post('/admin/post-categories', [BlogController::class, 'store'])
        ->name('admin.post-categories.store');
    Route::post('/admin/blog', [BlogController::class, 'storePost'])->name('admin.blog.store');
    //car
    Route::get('/admin/cars/create', [AdminController::class, 'createCar'])->name('admin.cars.create');
});


Route::middleware(['auth', 'role:moderator'])->group(function () {
    Route::get('/moderator', [ModeratorController::class, 'index'])->name('moderator.dashboard');
});
//dla wszystkich

Route::get('/kontakt', [PageController::class, 'showContact'])->name('contact');
Route::get('/o-nas',[PageController::class, 'showAbout'])->name('about');


Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');



Route::get('/cars', [CarController::class, 'index'])->name('cars.index');


Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
