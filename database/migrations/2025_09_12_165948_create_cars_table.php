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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number')->unique(); // nr_rej
            $table->string('vin')->unique(); // nr_vin
            $table->date('production_date');
            $table->string('image_path')->nullable();
            $table->string('brand');
            $table->string('model');
            $table->string('color');
            $table->integer('mileage');
            $table->string('fuel_type');
            $table->integer('power');
            $table->integer('seats');
            $table->integer('doors');
            $table->decimal('price_per_day', 8, 2);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};

