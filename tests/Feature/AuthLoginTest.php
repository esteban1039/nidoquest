<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Tests\TestCase;

class AuthLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_no_usa_sesion_stateful_de_sanctum(): void
    {
        // La API autentica solo con token en el header Authorization. Si este
        // middleware vuelve al grupo `api`, los POST del navegador
        // (Origin/Referer localhost:3000) se tratan como sesion web y fallan
        // con 419. VerifyCsrfToken se salta en APP_ENV=testing, asi que este
        // contrato es el guardian anti-419.
        $apiGroup = app('router')->getMiddlewareGroups()['api'] ?? [];

        $this->assertNotContains(EnsureFrontendRequestsAreStateful::class, $apiGroup);
    }

    public function test_login_desde_el_origen_del_frontend_no_exige_csrf(): void
    {
        $user = User::factory()->create();

        // El navegador envia Origin/Referer del frontend; la API usa
        // autenticacion por token y no debe tratar este POST como sesion web.
        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'Password123!',
        ], [
            'Origin' => 'http://localhost:3000',
            'Referer' => 'http://localhost:3000/auth/login',
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['user', 'tenants', 'token']);
    }
}
