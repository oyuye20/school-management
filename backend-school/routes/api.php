<?php

use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\EmailVerificationNotificationController;
use App\Http\Controllers\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
 */


//PROTECTED ROUTE
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $req) {
        return $req->user();
    });

    Route::post('/logout', [LoginController::class, 'logout']);
});



Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);



// --- Email Verification Routes ---

// Send Verification Email (user must be authenticated but not yet verified)
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth:sanctum', 'throttle:6,1']) // Auth required, and throttle to prevent abuse
    ->name('verification.send'); // Give it a name for easier URL generation

// Verify Email (This is the route the user clicks in their email)
// Note: This route will be hit directly by the browser (not necessarily by Axios from your SPA initially)
// It needs the signed URL and user ID.
Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify'); // Crucial name for Laravel's signed URLs
