<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'seminar_id',
        'amount',
        'paymentDate',
        'invoiceNumber',
        'paymentMethod',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'paymentDate' => 'datetime',
    ];

    /**
     * Get the user who made the payment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the seminar being paid for.
     */
    public function seminar(): BelongsTo
    {
        return $this->belongsTo(Seminar::class, 'seminar_id');
    }

    /**
     * Get the associated registration.
     */
    public function registration()
    {
        return Registration::where('user_id', $this->user_id)
            ->where('seminar_id', $this->seminar_id)
            ->first();
    }
}
