<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $userIds = DB::table('users')->where('role', '!=', 'admin')->pluck('id')->toArray();
        $seminarIds = DB::table('seminars')->pluck('id')->toArray();

        // Create 30 random registrations
        for ($i = 0; $i < 30; $i++) {
            $userId = $userIds[array_rand($userIds)];
            $seminarId = $seminarIds[array_rand($seminarIds)];

            // Check if this registration already exists
            $exists = DB::table('registrations')
                ->where('user_id', $userId)
                ->where('seminar_id', $seminarId)
                ->exists();

            if (!$exists) {
                $seminar = DB::table('seminars')->where('id', $seminarId)->first();
                $eventDate = Carbon::parse($seminar->eventDate);

                // Registration should be before event date
                $registrationDate = $faker->dateTimeBetween(
                    $eventDate->copy()->subMonths(2),
                    $eventDate->copy()->subDays(1)
                );

                DB::table('registrations')->insert([
                    'user_id' => $userId,
                    'seminar_id' => $seminarId,
                    'registrationDate' => $registrationDate,
                    'created_at' => $registrationDate,
                    'updated_at' => $registrationDate,
                ]);
            }
        }
    }
}
