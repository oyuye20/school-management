<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Students extends Model
{

    protected $table = 'students';

    protected $fillable = [
        'user_id', 'user_info_id', 'student_id'
    ];

    public function users(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
