<?php

namespace App\Http\Controllers\User;

use App\Models\Seminar;
use App\Models\Payment;
use App\Models\Registration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\SpeakerApplication;
use Midtrans\Snap;
use Midtrans\Config;

class UserController extends Controller
{
    public function list(Request $request)
    {
        $search = $request->query('search');
        $page = $request->query('page', 1);

        $query = Seminar::with('speaker:id,name')->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $seminars = $query->paginate(6)->withQueryString();

        return Inertia::render('Users/SeminarList', [
            'seminars' => $seminars->items(),
            'page' => $seminars->currentPage(),
            'last_page' => $seminars->lastPage(),
            'search' => $search,
        ]);
    }

    public function register(Request $request, Seminar $seminar)
    {
        $user = Auth::user();

        // Cek apakah sudah pernah daftar atau bayar seminar ini
        $alreadyRegistered = Registration::where('user_id', $user->id)
            ->where('seminar_id', $seminar->id)
            ->exists();

        $alreadyPaid = Payment::where('user_id', $user->id)
            ->where('seminar_id', $seminar->id)
            ->whereIn('status', ['pending', 'settlement'])
            ->exists();

        if ($alreadyRegistered || $alreadyPaid) {
            return response()->json([
                'message' => 'Kamu sudah mendaftar atau melakukan pembayaran untuk seminar ini.',
            ], 422);
        }

        // Jika seminar gratis
        if ($seminar->isFree()) {
            $user->registeredSeminars()->syncWithoutDetaching([
                $seminar->id => ['registrationDate' => now()]
            ]);
            return back()->with('success', 'Berhasil mendaftar seminar gratis.');
        }

        // Midtrans config
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $orderId = 'SEMINAR-' . uniqid();

        Payment::create([
            'user_id' => $user->id,
            'seminar_id' => $seminar->id,
            'amount' => $seminar->price,
            'invoiceNumber' => $orderId,
            'status' => 'pending',
            'paymentMethod' => null,
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $seminar->price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
            'item_details' => [[
                'id' => $seminar->id,
                'price' => (int) $seminar->price,
                'quantity' => 1,
                'name' => $seminar->title,
            ]],
            'callbacks' => [
                'finish' => route('seminars.history'),
                'unfinish' => route('seminars.history'),
                'error' => route('seminars.history'),
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'token' => $snapToken,
            'redirect' => null,
        ]);
    }

    public function midtransCallback(Request $request)
    {
        try {
            $payload = json_decode($request->getContent(), true);
            Log::info('📥 Midtrans Webhook Payload:', $payload);

            $orderId = trim($payload['order_id'] ?? '');
            $transaction = $payload['transaction_status'] ?? null;
            $type = $payload['payment_type'] ?? null;
            $gross = $payload['gross_amount'] ?? null;
            $signatureKey = $payload['signature_key'] ?? '';
            $statusCode = $payload['status_code'] ?? '';

            // Validasi signature
            $expectedSignature = hash('sha512', $orderId . $statusCode . $gross . env('MIDTRANS_SERVER_KEY'));
            if ($signatureKey !== $expectedSignature) {
                Log::warning("🚨 Invalid Midtrans signature for order_id: $orderId");
                return response()->json(['error' => 'Invalid signature'], 403);
            }

            $payment = Payment::where('invoiceNumber', $orderId)->first();

            if (!$payment) {
                Log::warning("⚠️ Payment not found for order_id: $orderId");
                return response()->json(['error' => 'Payment not found'], 404);
            }

            // Jika berhasil (settlement / capture)
            if (in_array($transaction, ['settlement', 'capture'])) {

                // Update status payment
                $payment->update([
                    'status' => 'settlement',
                    'paymentMethod' => $type,
                    'paymentDate' => now(),
                ]);

                // Cek jika belum ada registrasi
                $alreadyRegistered = Registration::where('user_id', $payment->user_id)
                    ->where('seminar_id', $payment->seminar_id)
                    ->exists();

                if (!$alreadyRegistered) {
                    Registration::create([
                        'user_id' => $payment->user_id,
                        'seminar_id' => $payment->seminar_id,
                        'registrationDate' => now(),
                    ]);
                    Log::info("✅ Status payment di-set ke 'settlement' dan registrasi dibuat: $orderId");
                } else {
                    Log::info("ℹ️ Pembayaran sukses tapi registrasi sudah ada: $orderId");
                }
            } else {
                Log::info("ℹ️ No action needed for transaction_status: $transaction on order_id: $orderId");
            }

            return response()->json(['status' => 'ok']);
        } catch (\Throwable $e) {
            Log::error("❌ Exception in midtransCallback: {$e->getMessage()}");
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function history()
    {
        $user = Auth::user();
        $seminars = $user->registeredSeminars()->with('speaker')->get();

        return Inertia::render('Users/SeminarHistory', [
            'seminars' => $seminars,
        ]);
    }

    public function speakerApplicationForm()
    {
        return Inertia::render('Users/SpeakerApplication');
    }

    public function submitSpeakerApplication(Request $request)
    {
        $request->validate([
            'remarks' => 'nullable|string|max:500',
            'cv' => 'required|file|mimes:pdf|max:2048',
        ]);

        $user = Auth::user();

        $application = SpeakerApplication::create([
            'user_id' => $user->id,
            'applicationDate' => now(),
            'status' => 'pending',
            'remarks' => $request->remarks,
        ]);

        $path = $request->file('cv')->storeAs(
            'cv_speakers',
            'cv_' . $user->id . '_' . $application->id . '.pdf',
            'public'
        );

        if (!$path) {
            Log::error('❌ CV upload failed');
        } else {
            Log::info('✅ CV uploaded to: ' . $path);
        }

        return back()->with('success', 'Lamaran pembicara berhasil dikirim.');
    }
}
