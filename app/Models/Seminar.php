<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Seminar extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'eventDate',
        'eventTime',
        'speaker_id',
        'price',
        'googleMeetLink',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'eventDate' => 'date:Y-m-d',
        'eventTime' => 'string',
        'price' => 'decimal:2',
    ];

    /**
     * Get the main speaker for the seminar.
     */
    public function speaker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'speaker_id');
    }

    /**
     * Get all registrations for this seminar.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class, 'seminar_id');
    }

    /**
     * Get all payments for this seminar.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'seminar_id');
    }

    /**
     * Get all feedback for this seminar.
     */
    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class, 'seminar_id');
    }

    /**
     * Get all speakers for this seminar through the pivot table.
     */
    public function speakers()
    {
        return $this->belongsToMany(User::class, 'seminar_speakers', 'seminar_id', 'speaker_id');
    }

    /**
     * Get all users registered for this seminar.
     */
    public function registeredUsers()
    {
        return $this->belongsToMany(User::class, 'registrations', 'seminar_id', 'user_id')
            ->withPivot('registrationDate')
            ->withTimestamps();
    }

    /**
     * Check if the seminar is free.
     */
    public function isFree(): bool
    {
        return $this->price == 0;
    }

    /**
     * Get the seminar's average rating.
     */
    public function averageRating()
    {
        return $this->feedbacks()->avg('rating');
    }
}
