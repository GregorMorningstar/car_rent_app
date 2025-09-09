<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class BlogController extends Controller
{
public function index()
    {
        return Inertia::render('blog/index');
    }
public function show($id)
    {
        $post = [
            'id' => $id,
            'title' => 'Sample Blog Post',
            'content' => 'This is a sample blog post content.'
        ];

        return Inertia::render('blog/post', [
            'post' => $post
        ]);
    }


}
