<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SeminarSpeaker extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'seminar_id',
        'speaker_id',
    ];

    /**
     * Get the seminar.
     */
    public function seminar(): BelongsTo
    {
        return $this->belongsTo(Seminar::class, 'seminar_id');
    }

    /**
     * Get the speaker (user).
     */
    public function speaker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'speaker_id');
    }
}
