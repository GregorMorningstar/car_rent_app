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
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
//blog
    Route::prefix('blog')->name('blog.')->group(function () {
        Route::get('create', [BlogController::class, 'create'])->name('create');
        Route::get('/article', [BlogController::class, 'indexArticle'])->name('index');
        Route::post('/', [BlogController::class, 'storePost'])->name('store');
    });
//category post
    Route::prefix('post-categories')->name('post-categories.')->group(function () {
        Route::get('/', [BlogController::class, 'indexCategories'])->name('index');
        Route::post('/', [BlogController::class, 'store'])->name('store');
        Route::get('{id}/edit', [BlogController::class, 'editCategory'])->name('edit');
        Route::put('{id}', [BlogController::class, 'updateCategory'])->name('update');
        Route::delete('{id}', [BlogController::class, 'destroyCategory'])->name('destroy');
    });
//cars
    Route::prefix('cars')->name('cars.')->group(function () {
        Route::get('create', [AdminController::class, 'createCar'])->name('create');
    });
});


Route::middleware(['auth', 'role:moderator'])->prefix('moderator')->name('moderator.')->group(function () {
    Route::get('/', [ModeratorController::class, 'index'])->name('dashboard');
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
