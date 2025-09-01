<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    protected $table = 'addresses';

    public function users(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
