<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function index(){
        return User::with(['userInfo' => function ($q){
            $q->select('first_name', 'last_name', 'user_id');
        }, 'teachers' => function ($q) {
            $q->select('employee_id', 'specialization');
        }])->where(['role' => 'teacher'])->paginate(10);
    }

    public function showTeacher($id) {
        $teacher = User::with(['userInfo' => function ($q){
            $q->select('first_name', 'last_name', 'user_id');
        }, 'teachers' => function ($q) {
            $q->select('employee_id', 'specialization');
        }])->where(['role' => 'teacher'])->find($id);

        if ($teacher)
            return $teacher;

        return response()->json([
            'status' => 'error',
            'message' => "Teacher with ID $id not found"
        ], 404);
    }

    public function delete($id){

    }


    public function create(TeacherRequest $req){
        try {
            DB::transaction(function () use ($req) {
                $user = User::create([
                    'email' => $req->email,
                    'password' => Hash::make($req->password),
                    'role' => 'teacher'
                ]);

                $user->userInfo()->create([
                    'first_name' => $req->first_name,
                    'middle_name' => $req->middle_name,
                    'last_name' => $req->last_name,
                    'birthday' => $req->birthday,
                    'gender' => $req->gender,
                    'contact_number' => $req->contact_number
                ]);

                $user->teachers()->create([
                    'employee_id' => '12312331',
                    'specialization' => $req->specialization
                ]);

//                MailJob::dispatch($user);
            });

            return response()->json([
                'message' => "Teacher added",
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
