<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SeminarSpeakerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $seminars = DB::table('seminars')->get();
        $speakerIds = DB::table('users')->where('isSpeaker', true)->pluck('id')->toArray();

        foreach ($seminars as $seminar) {
            $seminarCreatedAt = Carbon::parse($seminar->created_at);

            // Add the main speaker
            DB::table('seminar_speakers')->insert([
                'seminar_id' => $seminar->id,
                'speaker_id' => $seminar->speaker_id,
                'created_at' => $seminarCreatedAt,
                'updated_at' => $seminarCreatedAt,
            ]);

            // For some seminars, add a second speaker
            if ($faker->boolean(33)) { // About 33% of seminars get an additional speaker
                $availableSpeakers = array_filter($speakerIds, function($id) use ($seminar) {
                    return $id != $seminar->speaker_id;
                });

                if (!empty($availableSpeakers)) {
                    $additionalSpeakerId = $availableSpeakers[array_rand($availableSpeakers)];
                    $additionalSpeakerAddedAt = $faker->dateTimeBetween($seminarCreatedAt, 'now');

                    DB::table('seminar_speakers')->insert([
                        'seminar_id' => $seminar->id,
                        'speaker_id' => $additionalSpeakerId,
                        'created_at' => $additionalSpeakerAddedAt,
                        'updated_at' => $additionalSpeakerAddedAt,
                    ]);
                }
            }
        }
    }
}
