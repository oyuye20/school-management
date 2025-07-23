<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Jobs\MailJob;
use App\Models\Students;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;



class StudentController extends Controller
{
    public function index(){
        return Students::all();
    }

    public function create(StudentRequest $req)
    {

        try {
            DB::transaction(function () use ($req) {
                $user = User::create([
                    'name' => $req->name,
                    'email' => $req->email,
                    'password' => Hash::make($req->password),
                ]);

                $user->student_info()->create([
                    'first_name' => $req->first_name,
                    'middle_name' => $req->middle_name,
                    'last_name' => $req->last_name,
                    'birthday' => $req->birthday,
                    'gender' => $req->gender,
                    'address' => $req->address,
                ]);

                MailJob::dispatch($user);
            });

            return response()->json([
                'message' => "student added",
            ],200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

}
