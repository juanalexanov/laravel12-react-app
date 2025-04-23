<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class SeminarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $speakerIds = DB::table('users')->where('isSpeaker', true)->pluck('id')->toArray();

        $seminarTopics = [
            'Laravel',
            'PHP',
            'JavaScript',
            'Vue.js',
            'React',
            'Database Design',
            'API Development',
            'DevOps',
            'Machine Learning',
            'Cloud Computing',
            'Web Security',
            'UI/UX Design',
            'Mobile Development',
            'Python',
            'Data Science'
        ];

        for ($i = 0; $i < 10; $i++) {
            $topic = $seminarTopics[array_rand($seminarTopics)];
            $isFree = $faker->boolean(30); // 30% chance of being free
            $price = $isFree ? 0 : $faker->numberBetween(50, 500);
            $speakerId = $speakerIds[array_rand($speakerIds)];
            $futureDate = $faker->dateTimeBetween('+1 week', '+3 months');

            DB::table('seminars')->insert([
                'title' => $faker->randomElement([
                    "Mastering $topic",
                    "Advanced $topic Techniques",
                    "Introduction to $topic",
                    "$topic Fundamentals",
                    "$topic in Practice",
                    "The Future of $topic",
                    "$topic Workshop"
                ]),
                'description' => $faker->paragraphs(3, true),
                'eventDate' => $futureDate->format('Y-m-d'),
                'eventTime' => $faker->time('H:i:00', $faker->randomElement(['09:00', '17:00'])),
                'speaker_id' => $speakerId,
                'price' => $price,
                'googleMeetLink' => 'https://meet.google.com/' . Str::random(10),
                'created_at' => $faker->dateTimeBetween('-2 months', '-1 week'),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
