<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Students;
use App\Models\User;
use App\Models\UserInfo;
use App\Responses\MessageResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Query\Builder;


class StudentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sortBy = $request->input('sortBy');
        $orderBy = $request->input('orderBy');

        $tablesForSortingStudents = array("student_id", "first_name", "last_name");

        $studentQuery = DB::table('users AS u')
            ->rightJoin('user_info AS ui', 'u.id', '=', 'ui.user_id')
            ->rightJoin('students AS s', 'u.id', '=', 's.user_id')
            ->select('u.id', 'u.email', 'u.role', 'ui.first_name', 'ui.last_name', 's.student_id', 'ui.gender')
            ->when($search, function (Builder $query) use ($search) {
                return $query->where('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%")
                    ->orWhere('student_id', '=', $search);
            });


        if (($orderBy === "asc" || $orderBy === "desc") && (in_array($sortBy, $tablesForSortingStudents))) {
            $studentQuery->orderBy($sortBy, $orderBy);
        }

        $studentQuery->orderBy('id', 'desc');

        return $studentQuery->paginate(5);


        /*$students = User::with([
            'userInfo:first_name,last_name,user_id',
            'students:user_id,student_id'
        ])->when($search, function (Builder $query, string $search) {
            $query->whereHas('userInfo', function ($query) use ($search) {
                return $query->where('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "$search");
            })->orWhereHas('students', function ($query) use ($search) {
                return $query->where('student_id', '=', "$search");
            });
        });

        if ($sortBy && $orderBy) {
            $students->orderBy(
                UserInfo::select($sortBy)
                    ->whereColumn('user_id', 'users.id')
                    ->limit(1),
                $orderBy);
        }
        return StudentResource::collection($students->paginate(5));*/
    }

    public function showStudent($id)
    {
        $studentByID = User::with([
            'userInfo:first_name,last_name,user_id',
            'students:user_id,student_id'
        ])->find($id);

        if (!$studentByID)
            return (new MessageResponse("Student with ID $id not found", 404, 'error'))->message();

        return $studentByID;
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
