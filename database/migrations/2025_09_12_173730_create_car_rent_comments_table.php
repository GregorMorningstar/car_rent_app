<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('car_rent_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_rental_id')->constrained('car_rentals')->onDelete('cascade'); // wynajem samochodu
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // użytkownik
            $table->text('comment_text'); // tekst_komentarza
            $table->unsignedTinyInteger('rating')->nullable()->check('rating >= 1 and rating <= 5'); // ocena 1-5
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_rent_comments');
    }
};
