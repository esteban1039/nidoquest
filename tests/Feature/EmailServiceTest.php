<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\EmailService;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class EmailServiceTest extends TestCase
{
    public function test_sin_smtp_no_envia_ni_falla(): void
    {
        config(['mail.mailers.smtp.username' => null, 'mail.mailers.smtp.password' => null]);
        Log::shouldReceive('warning')->twice();

        $user = User::factory()->make(['email' => 'prueba@nidoquest.test']);

        app(EmailService::class)->sendWelcome($user);
        app(EmailService::class)->sendPasswordReset($user, 'token-de-prueba');
    }
}
