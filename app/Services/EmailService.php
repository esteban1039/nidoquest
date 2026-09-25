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

        $html = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recupera tu contraseña</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
  .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
  .logo { font-size: 22px; font-weight: 800; color: #0f766e; margin-bottom: 20px; }
  .btn { display: inline-block; background: #0f766e; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-weight: 700; font-size: 15px; margin: 24px 0; text-align: center; }
  .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; }
</style>
</head>
<body>
  <div class="card">
    <div class="logo">✨ NidoQuest</div>
    <h2 style="margin-top: 0; color: #0f172a; font-size: 20px;">Recupera tu contraseña</h2>
    <p>Hola <strong>{$user->name}</strong>,</p>
    <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en NidoQuest.</p>
    <div style="text-align: center;">
      <a href="{$url}" class="btn" target="_blank">Restablecer mi contraseña 🔑</a>
    </div>
    <p style="font-size: 13px; color: #64748b; line-height: 1.5;">Si el botón no abre directamente, copia y pega este enlace en tu navegador:<br><a href="{$url}" style="color: #0f766e; word-break: break-all;">{$url}</a></p>
    <p style="font-size: 13px; color: #64748b;">Este enlace expirará en 60 minutos. Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
    <div class="footer">
      NidoQuest — Misiones, hábitos y recompensas en familia.
    </div>
  </div>
</body>
</html>
HTML;

        $text = "Hola {$user->name},\n\nRecibimos una solicitud para recuperar tu contraseña de NidoQuest.\n\nCambia tu contraseña aquí:\n{$url}\n\nEste enlace expirará en 60 minutos. Si no solicitaste este cambio, puedes ignorar este correo.";

        $this->send($user->email, 'Recupera tu contraseña de NidoQuest 🔑', $html, $text);
    }

    public function sendWelcome(User $user, ?string $plainPassword = null): void
    {
        $url = $this->passwordResetBaseUrl().'/auth/login';
        $passwordLine = $plainPassword ? "<p style=\"background: #f1f5f9; padding: 10px 14px; border-radius: 8px;\"><strong>Contraseña temporal:</strong> <code>{$plainPassword}</code></p>" : '';
        $passwordTextLine = $plainPassword ? "\nContraseña temporal: {$plainPassword}\n" : '';

        $html = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bienvenido a NidoQuest</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
  .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
  .logo { font-size: 22px; font-weight: 800; color: #0f766e; margin-bottom: 20px; }
  .btn { display: inline-block; background: #0f766e; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-weight: 700; font-size: 15px; margin: 24px 0; text-align: center; }
  .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; }
</style>
</head>
<body>
  <div class="card">
    <div class="logo">🚀 ¡Bienvenido a NidoQuest!</div>
    <h2 style="margin-top: 0; color: #0f172a; font-size: 20px;">Tu Nido Familiar está listo</h2>
    <p>Hola <strong>{$user->name}</strong>,</p>
    <p>Tu cuenta ha sido creada exitosamente. Desde tu Nido podrás acompañar las misiones diarias, estrellas, rachas de fuego y recompensas de tus exploradores.</p>
    {$passwordLine}
    <div style="text-align: center;">
      <a href="{$url}" class="btn" target="_blank">Ingresar a mi Nido ✨</a>
    </div>
    <div class="footer">
      NidoQuest — Misiones, hábitos y recompensas en familia.
    </div>
  </div>
</body>
</html>
HTML;

        $text = "Hola {$user->name},\n\n¡Bienvenido a NidoQuest! Tu acceso está listo.{$passwordTextLine}\nIngresa aquí:\n{$url}\n\nDesde tu Nido podrás acompañar misiones, estrellas y recompensas.";

        $this->send($user->email, '¡Bienvenido a NidoQuest! 🚀', $html, $text);
    }

    private function passwordResetBaseUrl(): string
    {
        return $this->frontendBaseUrl() ?: 'https://nidoquest.pages.dev';
    }

    private function frontendBaseUrl(): string
    {
        $frontendUrl = config('services.frontend.url') ?: env('FRONTEND_URL');
        if (! empty($frontendUrl)) {
            return rtrim((string) $frontendUrl, '/');
        }

        $appUrl = rtrim((string) config('app.url'), '/');
        if (! empty($appUrl) && ! str_contains($appUrl, 'on-forge.com') && ! str_contains($appUrl, 'localhost') && ! str_contains($appUrl, '127.0.0.1')) {
            return $appUrl;
        }

        return 'https://nidoquest.pages.dev';
    }

    private function send(string $to, string $subject, string $html, ?string $text = null): void
    {
        $fromAddress = config('mail.from.address') ?: env('MAIL_FROM_ADDRESS', 'soporte@nidoquest.com');
        $fromName = config('mail.from.name') ?: env('MAIL_FROM_NAME', 'NidoQuest');

        try {
            Mail::send([], [], function ($message) use ($to, $subject, $html, $text, $fromAddress, $fromName): void {
                $message->to($to)
                    ->from($fromAddress, $fromName)
                    ->subject($subject)
                    ->html($html);

                if ($text) {
                    $message->text($text);
                }
            });

            Log::info('Correo enviado exitosamente vía Mail::send()', [
                'to' => $to,
                'subject' => $subject,
                'mailer' => config('mail.default'),
                'from' => $fromAddress,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error al enviar correo en EmailService.', [
                'to' => $to,
                'subject' => $subject,
                'mailer' => config('mail.default'),
                'from' => $fromAddress,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
