<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CalendarController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
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
