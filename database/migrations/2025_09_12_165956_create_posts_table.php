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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->foreignId('post_category_id')->constrained('post_categories')->onDelete('cascade'); // kategoria posta
            $table->string('meta_title', 60)->nullable(); // tytuł SEO
            $table->string('meta_description', 160)->nullable(); // opis SEO
            $table->string('meta_keywords')->nullable(); // słowa kluczowe SEO
            $table->string('og_image')->nullable(); // obrazek do Open Graph
            $table->string('image_path')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
