<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PostCategory extends Model
{

    protected $table = 'post_categories';
    use HasFactory;

    protected $fillable = [
        'name', // nazwa kategorii
        
    ];


    /**
     * Relacja: Kategoria ma wiele postów
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function category()
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }

}
