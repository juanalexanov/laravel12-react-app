<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ManagementPaymentController extends Controller {

    public function index() {
        $payments = Payment::with(['user', 'seminar'])
            ->where('status', 'settlement')
            ->latest()
            ->get();

        return Inertia::render('admin/ManagementPayments', [
            'payments' => $payments,
        ]);
    }

}
