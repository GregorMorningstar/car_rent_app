<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\PostService;
use App\Models\PostCategory; // dodaj
use Illuminate\Support\Str;   // dodaj
use Illuminate\Database\QueryException; // dodaj

class BlogController extends Controller
{

  protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }
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



    public function create()
    {
        return Inertia::render('blog/create');
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:post_categories,name'],
        ], [
            'name.unique' => 'Taka kategoria już istnieje.',
        ]);

        try {
            PostCategory::create([
                'name' => $data['name'],
            ]);
        } catch (QueryException $e) {
            if (($e->errorInfo[1] ?? null) === 1062) {
                return back()->withErrors(['name' => 'Taka kategoria już istnieje.'])->withInput();
            }
            throw $e;
        }

        return back()->with('success', 'Kategoria została utworzona.');
    }

}
