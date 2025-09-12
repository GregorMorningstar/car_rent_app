<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class PostComment extends Model
{

   use  HasFactory;

    protected $fillable = [
        'post_id', // post
        'user_id', // użytkownik
        'comment_text', // tekst_komentarza
        'rating', // ocena 1-5
    ];

    /**
     * Relacja: Komentarz należy do posta
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Relacja: Komentarz należy do użytkownika (autora)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
