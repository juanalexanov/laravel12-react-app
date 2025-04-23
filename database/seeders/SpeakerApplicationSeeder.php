<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SpeakerApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $regularUserIds = DB::table('users')
            ->where('role', 'user')
            ->where('isSpeaker', false)
            ->pluck('id')
            ->toArray();

        $statuses = ['pending', 'approved', 'rejected'];

        // Create 8 random speaker applications
        for ($i = 0; $i < 8; $i++) {
            if (empty($regularUserIds)) {
                break;
            }

            $randomIndex = array_rand($regularUserIds);
            $userId = $regularUserIds[$randomIndex];

            // Remove the user from the array to avoid duplicates
            unset($regularUserIds[$randomIndex]);
            $regularUserIds = array_values($regularUserIds);

            $status = $faker->randomElement($statuses);
            $applicationDate = $faker->dateTimeBetween('-3 months', '-1 week');

            $remarks = match ($status) {
                'approved' => $faker->randomElement([
                    'Great application with relevant experience.',
                    'Approved based on previous speaking engagements.',
                    'Excellent background and topic expertise.',
                    'Strong professional history in the field.'
                ]),
                'rejected' => $faker->randomElement([
                    'Insufficient experience in the field.',
                    'Application lacks required details.',
                    'Topic expertise not aligned with our needs.',
                    'Please reapply with more specific qualifications.'
                ]),
                'pending' => $faker->randomElement([
                    'Under review by the committee.',
                    'Waiting for additional information.',
                    null,
                    'Application received successfully.'
                ]),
                default => null,
            };

            DB::table('speaker_applications')->insert([
                'user_id' => $userId,
                'applicationDate' => $applicationDate,
                'status' => $status,
                'remarks' => $remarks,
                'created_at' => $applicationDate,
                'updated_at' => $status === 'pending' ? $applicationDate : $faker->dateTimeBetween($applicationDate, 'now'),
            ]);
        }
    }
}
