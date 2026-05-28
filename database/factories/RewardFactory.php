<?php

namespace Database\Factories;

use App\Models\Reward;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Reward> */
class RewardFactory extends Factory
{
    protected $model = Reward::class;

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Noche de película', 'Elegir postre', 'Tiempo de pantalla acompañado']),
            'description' => 'Recompensa sana y acordada en familia.',
            'stars_cost' => fake()->numberBetween(10, 40),
            'category' => 'familia',
            'type' => fake()->randomElement(['screen_time', 'experience', 'family']),
            'requires_approval' => true,
            'active' => true,
        ];
    }
}
