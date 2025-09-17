<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        Car::factory()
            ->count(10)
            ->create()
            ->each(function (Car $car) {
                // Jeśli masz przykładowe obrazy w public/images/cars/primary/,
                // możesz odkomentować poniższy kod, aby przypisać losowy obraz do samochodu.
                /*
                $samples = glob(public_path('images/cars/primary/sample*.jpg'));
                if ($samples) {
                    $pick = $samples[array_rand($samples)];
                    $rel = '/images/cars/primary/' . basename($pick);
                    $car->update(['image_path' => $rel]);
                }
                */
            });
    }
}
