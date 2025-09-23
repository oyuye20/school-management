<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Date;

class StudentRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|unique:users|email',
            'password' => 'required|min:1',
            'first_name' => 'required|min:1',
            'last_name' => 'required|min:1',
            'birthday' => [
                'required',
                'before_or_equal:' . now()->subYears(11)->toDateString(),
            ],

            'gender' => 'required|min:1',
            'contact_number' => 'required|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'birthday.before_or_equal' => 'Student must be at least 11 years old',
        ];
    }

    /* public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'errors'      => $validator->errors()
        ],422));
    } */
}
