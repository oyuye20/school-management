<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPassword extends Controller
{
    public function sendResetLinkEmail(Request $req){
        $req->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($req->only('email'));

        return $status === Password::RESET_LINK_SENT ? response()->json([
            'message' => __($status)
        ],200) : response()->json([
            'message' => __($status)
        ],400);
    }
}
