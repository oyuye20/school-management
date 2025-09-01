<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserInfo extends Model
{

    protected $table = 'user_info';

    protected $fillable = [
        'first_name', 'middle_name', 'last_name', 'birthday', 'gender', 'contact_number'
    ];

    public function users() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
