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
        $this->call([
            UserSeeder::class,
            SeminarSeeder::class,
            RegistrationSeeder::class,
            PaymentSeeder::class,
            FeedbackSeeder::class,
            SpeakerApplicationSeeder::class,
            SeminarSpeakerSeeder::class,
            UserRoleHistorySeeder::class,
        ]);
    }
}
