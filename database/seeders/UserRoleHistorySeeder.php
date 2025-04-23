<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class UserRoleHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $userIds = DB::table('users')->pluck('id')->toArray();
        $actionTypes = ['registration', 'payment', 'feedback', 'roleChange', 'login', 'logout', 'profile_update'];

        // Create 50 random history entries
        for ($i = 0; $i < 50; $i++) {
            $userId = $faker->randomElement($userIds);
            $actionType = $faker->randomElement($actionTypes);
            $actionDate = $faker->dateTimeBetween('-6 months', 'now');

            $actionDetails = match ($actionType) {
                'registration' => 'Registered for seminar: ' . $faker->sentence(4),
                'payment' => 'Made payment of $' . $faker->randomFloat(2, 50, 500) . ' for seminar',
                'feedback' => 'Submitted ' . $faker->randomElement(['positive', 'mixed', 'critical']) . ' feedback with rating ' . $faker->numberBetween(1, 5),
                'roleChange' => 'Role changed from ' . $faker->randomElement(['guest', 'user']) . ' to ' . $faker->randomElement(['user', 'admin']),
                'login' => 'User logged in from ' . $faker->randomElement(['web browser', 'mobile app', 'tablet']) . ' using ' . $faker->userAgent(),
                'logout' => 'User logged out after ' . $faker->randomElement(['brief', 'extended']) . ' session',
                'profile_update' => 'Updated profile information: ' . $faker->randomElement(['contact details', 'password', 'preferences', 'notification settings']),
                default => 'System action performed',
            };

            DB::table('user_role_history')->insert([
                'user_id' => $userId,
                'actionType' => $actionType,
                'actionDetails' => $actionDetails,
                'actionDate' => $actionDate,
                'created_at' => $actionDate,
                'updated_at' => $actionDate,
            ]);
        }
    }
}
