<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        // users
        for ($i = 1; $i <= 10; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => $faker->password(),
                'role' => 'user',
                'isSpeaker' => false,
                'created_at' => $faker->dateTimeBetween('-6 months', '-1 week'),
                'updated_at' => Carbon::now(),
            ]);
        }

        // Speaker users
        for ($i = 1; $i <= 3; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => 'user',
                'isSpeaker' => true,
                'created_at' => $faker->dateTimeBetween('-1 year', '-6 months'),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
