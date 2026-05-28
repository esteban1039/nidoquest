<?php

namespace Database\Factories;

use App\Models\Explorer;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Explorer> */
class ExplorerFactory extends Factory
{
    protected $model = Explorer::class;

    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'birthdate' => fake()->dateTimeBetween('-15 years', '-6 years')->format('Y-m-d'),
            'status' => 'active',
            'preferences' => ['tone' => 'motivador'],
        ];
    }
}
