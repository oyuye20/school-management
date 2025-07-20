<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    public function __invoke(EmailVerificationRequest $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            // Already verified, redirect to SPA's success page
            return redirect(env('SPA_URL') . '/email-verified?status=already-verified');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // After verification, you can log in the user if they weren't already.
        // For SPA, it's common to then redirect to a success page
        // which might then trigger a login or user data refresh on the SPA side.

        // Determine where to redirect the user after successful verification
        // This should be a route in your SPA, not a Laravel view.
        return redirect('http://localhost:5173' . '/email-verified?status=success'); // Redirect to your SPA URL
    }
}
