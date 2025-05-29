<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Registration;
use App\Models\Seminar;
use App\Models\Payment;
use App\Models\SpeakerApplication;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $range = $request->input('range', '7d');

        $stats = [
            'totalUsers' => User::count(),
            'totalSeminars' => Seminar::count(),
            'totalPayments' => Payment::where('status', 'settlement')->count(),
            'totalSpeakers' => User::where('isSpeaker', true)->count(),
        ];

        $query = Registration::query();
        $labels = [];
        $data = [];

        if ($range === '7d') {
            $start = now()->subDays(6)->startOfDay();
            $query->whereDate('registrationDate', '>=', $start);
            $labels = collect(range(0, 6))->map(fn($i) => now()->subDays(6 - $i)->format('d M'))->toArray();
            $data = collect(range(0, 6))->map(function ($i) use ($query) {
                $date = now()->subDays(6 - $i)->toDateString();
                return (clone $query)->whereDate('registrationDate', $date)->count();
            })->toArray();
        } elseif ($range === '1m') {
            $start = now()->subMonth()->startOfMonth();
            $query->whereDate('registrationDate', '>=', $start);
            $labels = collect(range(1, 31))->map(fn($i) => now()->startOfMonth()->addDays($i - 1)->format('d'))->toArray();
            $data = collect(range(1, 31))->map(function ($i) use ($query) {
                $date = now()->startOfMonth()->addDays($i - 1)->toDateString();
                return (clone $query)->whereDate('registrationDate', $date)->count();
            })->toArray();
        } elseif ($range === '1y') {
            $start = now()->subYear()->startOfYear();
            $query->whereDate('registrationDate', '>=', $start);
            $labels = collect(range(1, 12))->map(fn($m) => Carbon::create()->month($m)->format('F'))->toArray();
            $data = collect(range(1, 12))->map(function ($m) use ($query) {
                return (clone $query)->whereMonth('registrationDate', $m)->count();
            })->toArray();
        }

        $upcomingSeminars = Seminar::whereDate('eventDate', '>=', now())
            ->orderBy('eventDate')
            ->limit(5)
            ->get(['id', 'title', 'eventDate', 'eventTime']);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'chart' => [
                'labels' => $labels,
                'data' => $data,
            ],
            'upcomingSeminars' => $upcomingSeminars,
            'notifications' => [
                'seminarsWithoutSpeaker' => Seminar::whereNull('speaker_id')->count(),
                'pendingSpeakerApplications' => SpeakerApplication::where('status', 'pending')->count(),
            ],
        ]);
    }
}
