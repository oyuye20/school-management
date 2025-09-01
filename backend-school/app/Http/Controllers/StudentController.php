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
    public function index()
    {
        return User::with(['userInfo' => function ($q){
            $q->select('first_name', 'last_name', 'user_id');
        }, 'students' => function ($q) {
            $q->select('user_id', 'student_id');
        }])->paginate(10);
    }

    public function showStudent($id)
    {
        $student = User::with(['userInfo' => function ($q){
            $q->select('first_name', 'last_name', 'user_id');
        }, 'students' => function ($q) {
            $q->select('user_id', 'student_id');
        }])->find($id);

        if (!$student) {
            return response()->json([
                'status' => 'error',
                'message' => "Student with ID $id not found"
            ], 404);
        }
        return $student;
    }

    public function create(StudentRequest $req)
    {
        try {
            DB::transaction(function () use ($req) {
                $user = User::create([
                    'email' => $req->email,
                    'password' => Hash::make($req->password),
                ]);

                $user->userInfo()->create([
                    'first_name' => $req->first_name,
                    'middle_name' => $req->middle_name,
                    'last_name' => $req->last_name,
                    'birthday' => $req->birthday,
                    'gender' => $req->gender,
                    'contact_number' => $req->contact_number
                ]);

                $user->students()->create([
                    'student_id' => '12345678'
                ]);

//                MailJob::dispatch($user);
            });

            return response()->json([
                'message' => "student added",
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

}
