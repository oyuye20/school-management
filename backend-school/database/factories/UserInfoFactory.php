<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserInfo>
 */
class UserInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $birthday = fake()->dateTimeBetween('-18 years', '-11 years');
        $phoneNumber = random_int(1111111, 9999999);

        return [
            'user_id' => User::factory(),
            'first_name' => fake()->firstName(),
            'middle_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'birthday' => $birthday->format('Y-m-d'),
            'gender' => fake()->randomElement(['male', 'female', 'others']),
            'contact_number' => fake()->randomElement(
                ["0977$phoneNumber", "0948$phoneNumber"]
            ),
        ];
    }
}
