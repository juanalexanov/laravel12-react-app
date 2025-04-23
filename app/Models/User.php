<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'isSpeaker',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'isSpeaker' => 'boolean',
        ];
    }

    public function speakerSeminars(): HasMany
    {
        return $this->hasMany(Seminar::class, 'speaker_id');
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class, 'user_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'user_id');
    }

    /**
     * Get the feedback submitted by this user.
     */
    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class, 'user_id');
    }

    /**
     * Get the speaker applications submitted by this user.
     */
    public function speakerApplications(): HasMany
    {
        return $this->hasMany(SpeakerApplication::class, 'user_id');
    }

    /**
     * Get all seminars where this user is a speaker through the pivot table.
     */
    public function seminarsAsSpeaker()
    {
        return $this->belongsToMany(Seminar::class, 'seminar_speakers', 'speaker_id', 'seminar_id');
    }

    /**
     * Get all seminars registered by this user.
     */
    public function registeredSeminars()
    {
        return $this->belongsToMany(Seminar::class, 'registrations', 'user_id', 'seminar_id')
            ->withPivot('registrationDate')
            ->withTimestamps();
    }

    /**
     * Get the user role history entries for this user.
     */
    public function roleHistory(): HasMany
    {
        return $this->hasMany(UserRoleHistory::class, 'user_id');
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
