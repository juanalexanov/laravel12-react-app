<?php

namespace App\Http\Controllers\User;

use App\Models\Seminar;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function list(Request $request)
    {
        $search = $request->query('search');
        $page = $request->query('page', 1);

        $query = Seminar::with('speaker')->latest();

        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $perPage = 6;
        $seminars = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Users/SeminarList', [
            'seminars' => $seminars->items(),
            'page' => $seminars->currentPage(),
            'last_page' => $seminars->lastPage(),
            'search' => $search,
        ]);
    }


    public function history()
    {
        $user = Auth::user();

        // Ambil seminar yang telah diikuti user
        $seminars = $user->registeredSeminars()->with('speaker')->get();

        return Inertia::render('Users/SeminarHistory', [
            'seminars' => $seminars,
        ]);
    }
}
