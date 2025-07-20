<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;

use App\Jobs\MailJob;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class LoginController extends Controller
{
    public function register(Request $req)
    {

        try {
            $req->validate([
                'name' => 'required',
                'email' => 'required:unique',
                'password' => 'required',
            ]);

            $user = User::create([
                'name' => $req->name,
                'email' => $req->email,
                'password' => Hash::make($req->password)
            ]);

            MailJob::dispatch($user);
            return response()->json([
                'message' => 'Successfully registered',
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'error ' . $th,
            ], 500);
        }



        // event(new Registered($user));

        //        $user->sendEmailVerificationNotification();


    }

    public function login(Request $request)
    {
        $validate = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($validate)) {
            session()->regenerate();
            return response()->json([
                'message' => 'Successfully logged in',
                'user' => Auth::user(),
            ], 200);
        }

        return response()->json([
            'error' => 'Incorrect credentials',
        ], 400);

    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();


        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }
}
