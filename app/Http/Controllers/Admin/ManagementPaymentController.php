<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\SeminarReminderMail;
use App\Models\Payment;
use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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

    public function remind(Payment $payment){
         $user = $payment->user;
        $seminar = $payment->seminar;

        if (!$user || !$seminar) {
            return back()->withErrors(['message' => 'Data tidak lengkap untuk mengirim email.']);
        }

        Mail::to($user->email)->send(new SeminarReminderMail($user, $seminar));

        return back()->with('message', 'Email pengingat berhasil dikirim ke ' . $user->email);
    }

}
