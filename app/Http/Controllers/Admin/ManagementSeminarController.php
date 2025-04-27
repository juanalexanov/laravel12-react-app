<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ManagementSeminarController extends Controller
{
    public function index(Request $request)
    {
        // $query = Seminar::query();
        $query = Seminar::with('speakers');

        if ($search = $request->get('search')) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $perPage = 6;
        $seminars = $query->latest()->paginate($perPage)->withQueryString();

        $speakers = User::where('isSpeaker', true)->select('id', 'name')->get();

        return Inertia::render('admin/ManagementSeminars', [
            'seminars' => $seminars->items(),
            'currentPage' => $seminars->currentPage(),
            'totalPages' => $seminars->lastPage(),
            'perPage' => $seminars->perPage(),
            'speakers' => $speakers,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'eventDate' => ['required', 'date'],
            'eventTime' => ['required', 'date_format:H:i'],
            'price' => ['required', 'numeric'],
            'googleMeetLink' => ['nullable', 'string'],
            'speaker_ids' => ['array'],
            'speaker_ids.*' => ['exists:users,id'],
        ]);

        DB::transaction(function () use ($validated) {
            $seminar = Seminar::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'eventDate' => $validated['eventDate'],
                'eventTime' => $validated['eventTime'],
                'price' => $validated['price'],
                'googleMeetLink' => $validated['googleMeetLink'] ?? null,
            ]);

            if (!empty($validated['speaker_ids'])) {
                $seminar->speakers()->attach($validated['speaker_ids']);
            }
        });

        return redirect()->back()->with('success', 'Seminar created successfully.');
    }

    public function update(Request $request, Seminar $seminar)
    {
        $validated = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'eventDate' => ['required', 'date'],
            'eventTime' => ['required', 'date_format:H:i'],
            'price' => ['required', 'numeric'],
            'googleMeetLink' => ['nullable', 'string'],
            'speaker_ids' => ['array'],
            'speaker_ids.*' => ['exists:users,id'],
        ]);

        DB::transaction(function () use ($seminar, $validated) {
            $seminar->update([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'eventDate' => $validated['eventDate'],
                'eventTime' => $validated['eventTime'],
                'price' => $validated['price'],
                'googleMeetLink' => $validated['googleMeetLink'] ?? null,
            ]);

            if (isset($validated['speaker_ids'])) {
                $seminar->speakers()->sync($validated['speaker_ids']);
            }
        });

        return redirect()->back()->with('success', 'Seminar updated successfully.');
    }

    public function destroy(Seminar $seminar)
    {
        $seminar->delete();

        return redirect()->back()->with('success', 'Seminar deleted successfully.');
    }
}
