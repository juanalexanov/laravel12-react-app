<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Registration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'seminar_id',
        'registrationDate',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'registrationDate' => 'datetime',
    ];

    /**
     * Get the user who made the registration.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the seminar being registered for.
     */
    public function seminar(): BelongsTo
    {
        return $this->belongsTo(Seminar::class, 'seminar_id');
    }

    /**
     * Get the payment associated with this registration, if any.
     */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class, 'seminar_id', 'seminar_id')
                    ->where('user_id', $this->user_id);
    }

    /**
     * Check if this registration has been paid.
     */
    public function isPaid(): bool
    {
        return $this->payment() !== null;
    }
}
