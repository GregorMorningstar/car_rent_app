<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title', // tytuł
        'body', // treść
        'slug', // przyjazny URL
        'meta_title', // tytuł SEO
        'meta_description', // opis SEO
        'meta_keywords', // słowa kluczowe SEO
        'og_image', // obrazek do Open Graph
        'canonical_url', // kanoniczny adres URL
        'image_path', // ścieżka do obrazka
        'user_id', // autor
    ];

    /**
     * Relacja: Post należy do użytkownika (autora)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }

    /**
     * Relacja: Post ma wiele komentarzy
     */
    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }
}
