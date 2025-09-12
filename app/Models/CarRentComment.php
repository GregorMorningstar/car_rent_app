<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Factories\HasFactory;

class CarRentComment extends Model
{
   use  HasFactory;

    protected $fillable = [
        'car_rent_id', // wynajem samochodu
        'user_id', // użytkownik
        'comment_text', // tekst_komentarza
        'rating', // ocena 1-5
    ];

    /**
     * Relacja: Komentarz należy do wynajmu samochodu
     */
    public function carRent()
    {
        return $this->belongsTo(CarRent::class);
    }

    /**
     * Relacja: Komentarz należy do użytkownika (autora)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
