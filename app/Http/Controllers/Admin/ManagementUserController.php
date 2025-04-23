<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagementUserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 10);
        $page = $request->get('page', 1);

        $users = User::orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('admin/ManagementUsers', [
            'users' => $users->items(),
            'currentPage' => $users->currentPage(),
            'totalPages' => $users->lastPage(),
            'perPage' => $users->perPage(),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string'],
            'role' => ['required', 'in:guest,user,admin'],
            'isSpeaker' => ['required', 'boolean'],
        ]);

        User::create($validated);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['nullable', 'string'],
            'role' => ['required', 'in:guest,user,admin'],
            'isSpeaker' => ['required', 'boolean'],
        ]);

        if ($request->filled('password')) {
            $validated['password'] = $request->input('password');
        }

        $user->update($validated);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
