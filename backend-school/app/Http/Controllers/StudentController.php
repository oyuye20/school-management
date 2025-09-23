<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Http\Resources\StudentResource;
use App\Jobs\MailJob;
use App\Models\Students;
use App\Models\User;
use App\Responses\MessageResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Expr\New_;

use function Laravel\Prompts\select;

class StudentController extends Controller
{
    public function index()
    {
        $students = User::with([
            'userInfo' => function ($q) {
                $q->select('first_name', 'last_name', 'user_id');
            },
            'students' => function ($q) {
                $q->select('user_id', 'student_id');
            }
        ])->paginate(10);


        return StudentResource::collection($students);
    }

    public function showStudent($id)
    {
        $student = User::with([
            'userInfo' => function ($q) {
                $q->select('first_name', 'last_name', 'user_id');
            },
            'students' => function ($q) {
                $q->select('user_id', 'student_id');
            }
        ])->find($id);

        if (!$student)
            return (new MessageResponse("Student with ID $id not found", 404, 'error'))->message();


        return $student;
    }

    public function create(StudentRequest $req)
    {
        try {
            DB::transaction(function () use ($req) {
                $user = User::create([
                    'email' => $req->email,
                    'password' => Hash::make($req->password),
                    'role' => 'student'
                ]);


                $user->userInfo()->create([
                    'first_name' => $req->first_name,
                    'middle_name' => $req->middle_name,
                    'last_name' => $req->last_name,
                    'birthday' => $req->birthday,
                    'gender' => $req->gender,
                    'contact_number' => $req->contact_number
                ]);


                $studentId = random_int(1, 999999);

                $user->students()->create([
                    'student_id' => date("Y") . $studentId
                ]);

                //                MailJob::dispatch($user);
            });

            return (new MessageResponse('success', 200, 'Student added'))->message();

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }


    public function update(StudentRequest $req, $id)
    {

    }

    public function delete($id)
    {
        $student = User::find($id);

        if (!$student)
            return (new MessageResponse("Student with ID $id not found", 404, 'error'))->message();

        return $student;
    }

}
