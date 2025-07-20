<?php

namespace App\Http\Controllers;

use http\Client\Response;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    public function store(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            // If email is already verified, return a 204 No Content
            return response()->noContent(204);
        }

        // Send the verification notification
        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification link sent!'], 200);
    }
}
