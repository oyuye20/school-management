<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:1',
            'email' => 'required|min:1',
            'password' => 'required|min:1',
            'first_name' => 'required|min:1',
            'last_name' => 'required|min:1',
            'birthday' => 'required|min:1',
            'gender' => 'required|min:1',
            'contact_number'=> 'required|min:1',
            'specialization' => 'required|min:1',
            'employee_id' => 'required|unique'
        ];
    }
}
