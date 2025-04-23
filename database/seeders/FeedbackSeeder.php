<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $registrations = DB::table('registrations')->get();

        // Give feedback for about 60% of registrations
        foreach ($registrations as $registration) {
            // Skip some registrations randomly
            if ($faker->boolean(40)) {
                continue;
            }

            $seminar = DB::table('seminars')->where('id', $registration->seminar_id)->first();
            $seminarDate = Carbon::parse($seminar->eventDate);

            // Only create feedback for past seminars
            if ($seminarDate->isPast()) {
                $rating = $faker->biasedNumberBetween(3, 5, function($x) { return 1 - 0.9 * abs($x - 5) / 2; });

                $feedbackDate = $faker->dateTimeBetween(
                    $seminarDate,
                    $seminarDate->copy()->addDays(7)
                );

                DB::table('feedbacks')->insert([
                    'user_id' => $registration->user_id,
                    'seminar_id' => $registration->seminar_id,
                    'rating' => $rating,
                    'review' => $faker->realText($faker->numberBetween(80, 200)),
                    'feedbackDate' => $feedbackDate,
                    'created_at' => $feedbackDate,
                    'updated_at' => $feedbackDate,
                ]);
            }
        }
    }
}
