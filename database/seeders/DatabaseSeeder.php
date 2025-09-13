<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => bcrypt('qwer1234'),
        ]);

        User::factory()->create([
            'name' => 'Moderator User',
            'email' => 'moderator@example.com',
            'role' => 'moderator',
            'password' => bcrypt('qwer1234'),
        ]);
    }
}
