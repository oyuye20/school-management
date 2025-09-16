<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->userInfo->first_name,
            'last_name' => $this->userInfo->last_name,
            'email' => $this->email,
            'role' => $this->role,
            'student_id' => $this->students->student_id
        ];
    }
}
