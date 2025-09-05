<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Teachers extends Model
{
    protected $fillable = [
        'specialization', 'employee_id'
    ];

    public function users(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
