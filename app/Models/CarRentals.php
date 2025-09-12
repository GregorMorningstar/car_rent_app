<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarRentals extends Model
{

use \Illuminate\Database\Eloquent\Factories\HasFactory;
    protected $fillable = [
        'car_id', // samochód
        'user_id', // użytkownik
        'rental_start', // data rozpoczęcia wynajmu
        'rental_end', // data zakończenia wynajmu
        'total_price', // całkowita cena
        'status', // status (np. zarezerwowany, anulowany, zakończony)
    ];

    /**
     * Relacja: Wynajem należy do samochodu
     */
    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    /**
     * Relacja: Wynajem należy do użytkownika
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relacja: Wynajem ma wiele komentarzy
     */
    public function comments()
    {
        return $this->hasMany(CarRentComment::class);
    }

}
