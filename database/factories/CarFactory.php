<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition(): array
    {
        $sets = [
            ['brand' => 'Toyota', 'models' => ['Corolla', 'Yaris', 'Camry']],
            ['brand' => 'Honda', 'models' => ['Civic', 'Accord', 'Jazz']],
            ['brand' => 'Ford', 'models' => ['Focus', 'Fiesta', 'Mondeo']],
            ['brand' => 'BMW', 'models' => ['320i', 'X3', 'X5']],
            ['brand' => 'Audi', 'models' => ['A3', 'A4', 'Q5']],
            ['brand' => 'Opel', 'models' => ['Astra', 'Corsa', 'Insignia']],
        ];

        $pick = fake()->randomElement($sets);
        $model = fake()->randomElement($pick['models']);

        // VIN: 17 znaków (bez I, O, Q) - litery A-H, J-N, P, R-Z oraz cyfry 0-9
        $vin = fake()->unique()->regexify('[A-HJ-NPR-Z0-9]{17}');

        // Nr rejestracyjny (np. "WX 1234A")
        $registration = fake()->unique()->regexify('[A-Z]{2} [0-9]{4}[A-Z]?');

        return [
            'registration_number' => $registration,
            'vin' => $vin,
            'production_date' => fake()->dateTimeBetween('-12 years', '-1 year')->format('Y-m-d'),
            'image_path' => null, // Można później uzupełnić po dodaniu obrazów
            'brand' => $pick['brand'],
            'model' => $model,
            'color' => fake()->safeColorName(),
            'mileage' => fake()->numberBetween(10_000, 240_000),
            'fuel_type' => fake()->randomElement(['petrol', 'diesel', 'hybrid', 'electric']),
            'power' => fake()->numberBetween(55, 320),
            'seats' => fake()->randomElement([2, 4, 5, 7]),
            'doors' => fake()->randomElement([2, 3, 4, 5]),
            'price_per_day' => fake()->randomFloat(2, 70, 500),
            'description' => fake()->sentence(12),
        ];
    }
}
