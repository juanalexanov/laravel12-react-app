<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SpeakerApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagementApplicationController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        $perPage = 6;

        $query = SpeakerApplication::with('user')->latest('applicationDate');

        if (in_array($status, ['pending', 'approved', 'rejected'])) {
            $query->where('status', $status);
        }

        $applications = $query->paginate($perPage)->withQueryString();

        return Inertia::render('admin/ManagementApplications', [
            'applications' => $applications->items(),
            'currentPage' => $applications->currentPage(),
            'totalPages' => $applications->lastPage(),
            'statusFilter' => $status,
        ]);
    }


    public function approve(SpeakerApplication $application)
    {
        $application->update(['status' => 'approved']);
        return back()->with('success', 'Aplikasi disetujui.');
    }

    public function reject(SpeakerApplication $application)
    {
        $application->update(['status' => 'rejected']);
        return back()->with('success', 'Aplikasi ditolak.');
    }
}
