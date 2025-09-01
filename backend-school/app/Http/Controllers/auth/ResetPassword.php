<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;


class ResetPassword extends Controller
{
    public function passwordUpdate(Request $request){
        $request->validate([
            'token' => 'required',
            'email' => ['required','email'],
            'password'=> 'required'
        ]);

        $status = Password::reset($request->only('email', 'password', 'password_confirmation', 'token')
        ,function(User $user, string $password){
            $user->forceFill([
                'password'=> Hash::make(value: $password)
            ])->setRememberToken(Str::random(60));

            $user->save();
            event(new PasswordReset($user));

        });

        return $status === Password::PASSWORD_RESET ? response()->json([
            'message' => __($status)
        ],200) : response()->json([
            'message' => __($status)
        ],400);
    }
}
