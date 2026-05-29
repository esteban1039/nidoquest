<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MailgunEmailService
{
    public function sendPasswordReset(User $user, string $token): void
    {
        $url = rtrim((string) config('services.frontend.url'), '/')
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
        $url = rtrim((string) config('services.frontend.url'), '/').'/auth/login';
        $passwordLine = $plainPassword ? "\nContrasena inicial: {$plainPassword}\n" : '';

        $this->send(
            $user->email,
            'Bienvenido a NidoQuest',
            "Hola {$user->name},\n\nTu acceso a NidoQuest esta listo.\n{$passwordLine}\nIngresa aqui:\n{$url}\n\nDesde tu Nido podras acompanhar misiones, estrellas y recompensas."
        );
    }

    private function send(string $to, string $subject, string $text): void
    {
        $domain = config('services.mailgun.domain');
        $secret = config('services.mailgun.secret');

        if (! $domain || ! $secret) {
            Log::warning('Mailgun no esta configurado; correo omitido.', ['to' => $to, 'subject' => $subject]);

            return;
        }

        $fromName = config('services.mailgun.from_name', 'NidoQuest');
        $from = config('services.mailgun.from', 'soporte@nidoquest.com');
        $endpoint = rtrim((string) config('services.mailgun.endpoint', 'https://api.mailgun.net'), '/');

        $response = Http::withBasicAuth('api', (string) $secret)
            ->asForm()
            ->post("{$endpoint}/v3/{$domain}/messages", [
                'from' => Str::of((string) $fromName)->trim().' <'.$from.'>',
                'to' => $to,
                'subject' => $subject,
                'text' => $text,
            ]);

        if (! $response->successful()) {
            Log::error('No se pudo enviar correo por Mailgun.', [
                'to' => $to,
                'subject' => $subject,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        }
    }
}
