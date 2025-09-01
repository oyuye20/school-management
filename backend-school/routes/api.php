<?php

use App\Http\Controllers\auth\ForgotPassword;
use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\ResetPassword;
use App\Http\Controllers\EmailVerificationNotificationController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\VerifyEmailController;
use App\Models\User;
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

Route::prefix('v1')->group(function () {

    Route::middleware(['auth:sanctum'])->group(function () {


    });



    /* FOR FORGOT PASSWORD ROUTE */
    Route::post('/forgot-password', [ForgotPassword::class, 'sendResetLinkEmail'])->name('password.reset');
    Route::post('/reset-password', [ResetPassword::class, 'passwordUpdate'])->name('password.update');


    /* FOR STUDENT ROUTE */
    Route::get('/students', [StudentController::class, 'index']);
    Route::post('/students', [StudentController::class, 'create']);
    /* END OF STUDENT ROUTE  */


    Route::get('/students/{id}', [StudentController::class, 'showStudent']);
});







Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);



// --- Email Verification Routes ---

// Send Verification Email (user must be authenticated but not yet verified)
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth:sanctum', 'throttle:6,1']) // Auth required, and throttle to prevent abuse
    ->name('verification.send'); // Give it a name for easier URL generation


Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify'); // Crucial name for Laravel's signed URLs
