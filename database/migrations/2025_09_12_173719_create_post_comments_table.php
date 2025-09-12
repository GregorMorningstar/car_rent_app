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
        Schema::create('post_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained('posts')->onDelete('cascade'); // post
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
        Schema::dropIfExists('post_comments');
    }
};
