<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Students extends Model
{
    
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'birthday',
        'gender',
        'address',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
