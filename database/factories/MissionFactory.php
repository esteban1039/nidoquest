<?php

namespace Database\Factories;

use App\Models\Mission;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Mission> */
class MissionFactory extends Factory
{
    protected $model = Mission::class;

    public function definition(): array
    {
        return [
            'title' => fake()->randomElement(['Leer 15 minutos', 'Organizar la habitación', 'Preparar la maleta']),
            'description' => 'Una misión sencilla para avanzar con constancia.',
            'stars' => fake()->numberBetween(2, 8),
            'frequency' => fake()->randomElement(['once', 'daily', 'weekly']),
            'due_date' => now()->addDays(fake()->numberBetween(1, 7)),
            'evidence_required' => false,
            'evidence_type' => 'guide_confirmation',
            'difficulty' => fake()->randomElement(['easy', 'medium']),
            'status' => 'pending',
            'motivational_message' => 'Paso a paso también se llega lejos.',
            'active' => true,
        ];
    }
}
