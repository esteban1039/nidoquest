<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    public function sendPasswordReset(User $user, string $token): void
    {
        $url = $this->passwordResetBaseUrl()
            .'/auth/reset-password?token='.urlencode($token)
            .'&email='.urlencode($user->email);

        $this->send(
            $user->email,
            'Recupera tu contrasena de NidoQuest',
            "Hola {$user->name},\n\nRecibimos una solicitud para recuperar tu contrasena.\n\nCambia tu contrasena aqui:\n{$url}\n\nSi no solicitaste este cambio, puedes ignorar este correo."
        );
    }

    public function sendWelcome(User $user, ?string $plainPassword = null): void
    {
        $url = $this->publicBaseUrl().'/auth/login';
        $passwordLine = $plainPassword ? "\nContrasena inicial: {$plainPassword}\n" : '';

        $this->send(
            $user->email,
            'Bienvenido a NidoQuest',
            "Hola {$user->name},\n\nTu acceso a NidoQuest esta listo.\n{$passwordLine}\nIngresa aqui:\n{$url}\n\nDesde tu Nido podras acompanhar misiones, estrellas y recompensas."
        );
    }

    private function passwordResetBaseUrl(): string
    {
        return $this->publicBaseUrl();
    }

    private function publicBaseUrl(): string
    {
        return $this->frontendBaseUrl() ?: rtrim((string) config('app.url'), '/');
    }

    private function frontendBaseUrl(): string
    {
        return rtrim((string) config('services.frontend.url'), '/');
    }

    private function send(string $to, string $subject, string $text): void
    {
        if (! config('mail.mailers.smtp.username') || ! config('mail.mailers.smtp.password')) {
            Log::warning('SMTP no esta configurado; correo omitido.', ['to' => $to, 'subject' => $subject]);

            return;
        }

        try {
            Mail::raw($text, function ($message) use ($to, $subject): void {
                $message->to($to)->subject($subject);
            });
        } catch (\Throwable $e) {
            Log::error('No se pudo enviar correo por SMTP.', [
                'to' => $to,
                'subject' => $subject,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
