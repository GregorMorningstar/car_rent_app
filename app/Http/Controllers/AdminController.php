<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    public function createCar()
    {
        return Inertia::render('Admin/CreateCar');
    }
}
