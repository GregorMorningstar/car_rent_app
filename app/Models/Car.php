<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'registration_number',
        'vin',
        'production_date',
        'brand',
        'model',
        'color',
        'mileage',
        'fuel_type',
        'power',
        'seats',
        'doors',
        'price_per_day',
        'description',
        'image_path', // stored uploaded file path
        'registration_number',
    ];

    protected $casts = [
        'production_date' => 'date',
        'mileage' => 'integer',
        'power' => 'integer',
        'seats' => 'integer',
        'doors' => 'integer',
        'price_per_day' => 'decimal:2',
    ];
}
