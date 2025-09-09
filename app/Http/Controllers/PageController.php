<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function showContact()
    {
        return Inertia::render('contact');
    }

    public function showAbout()
    {
        return Inertia::render('about-us');
    }
}
