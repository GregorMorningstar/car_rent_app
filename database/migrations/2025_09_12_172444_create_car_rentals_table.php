<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enum\CarRentalsStatusEnum;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      

        Schema::create('car_rentals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained('cars')->onDelete('cascade'); // samochód
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // użytkownik
            $table->integer('rental_days'); // dni_wynajmu
            $table->date('rental_start_date'); // data_rozpoczecia
            $table->date('rental_end_date'); // data_zakonczenia
            $table->decimal('total_price', 10, 2); // cena_calkowita
            $table->enum('status', array_map(fn($case) => $case->value, CarRentalsStatusEnum::cases()))->default(CarRentalsStatusEnum::PENDING_PAYMENT->value); // status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_rentals');
    }
};
