<?php

use App\Models\User;
use App\Services\EmailService;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;

Artisan::command('nidoquest:hello', function (): void {
    $this->info('NidoQuest backend ready.');
});

Artisan::command('nidoquest:create-super-admin {email} {password} {name=Super Admin}', function (string $email, string $password, string $name): void {
    $user = User::updateOrCreate(
        ['email' => $email],
        [
            'name' => $name,
            'password' => $password,
            'role' => User::ROLE_SUPER_ADMIN,
            'locale' => 'es-LATAM',
            'active' => true,
            'must_change_password' => true,
        ],
    );

    $this->info("Super admin listo: {$user->email}");
});

Artisan::command('nidoquest:test-mail {email}', function (string $email, EmailService $emailService): void {
    $this->info("Probando envío de correo a: {$email} usando mailer: ".config('mail.default'));
    $this->line('Host: '.config('mail.mailers.smtp.host').':'.config('mail.mailers.smtp.port'));
    $this->line('From: '.config('mail.from.address').' ('.config('mail.from.name').')');

    $dummyUser = new User([
        'name' => 'Usuario de Prueba',
        'email' => $email,
    ]);

    try {
        $emailService->sendPasswordReset($dummyUser, 'token-de-prueba-123456');
        $this->info("✅ Solicitud de envío ejecutada. Revisa tu bandeja de entrada o storage/logs/laravel.log");
    } catch (\Throwable $e) {
        $this->error("❌ Error al enviar correo: ".$e->getMessage());
    }
});
