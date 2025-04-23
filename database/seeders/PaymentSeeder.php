<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $registrations = DB::table('registrations')->get();
        $paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Google Pay', 'Apple Pay', 'Crypto'];

        foreach ($registrations as $registration) {
            $seminar = DB::table('seminars')->where('id', $registration->seminar_id)->first();

            // Only create payments for paid seminars
            if ($seminar->price > 0) {
                $registrationDate = Carbon::parse($registration->registrationDate);

                // Payment should be within 24 hours of registration
                $paymentDate = $faker->dateTimeBetween(
                    $registrationDate,
                    $registrationDate->copy()->addHours(24)
                );

                DB::table('payments')->insert([
                    'user_id' => $registration->user_id,
                    'seminar_id' => $registration->seminar_id,
                    'amount' => $seminar->price,
                    'paymentDate' => $paymentDate,
                    'invoiceNumber' => 'INV-' . date('Ymd', strtotime($paymentDate->format('Y-m-d'))) . '-' . $faker->unique()->randomNumber(4),
                    'paymentMethod' => $faker->randomElement($paymentMethods),
                    'created_at' => $paymentDate,
                    'updated_at' => $paymentDate,
                ]);
            }
        }
    }
}
