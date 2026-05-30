<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/auth/login', function () {
    $frontendUrl = rtrim((string) config('services.frontend.url'), '/');
    $appUrl = rtrim((string) config('app.url'), '/');

    abort_if($frontendUrl === '' || $frontendUrl === $appUrl, 404);

    return redirect()->away($frontendUrl.'/auth/login');
});

Route::get('/billing/return', function (Request $request) {
    $frontendUrl = rtrim((string) config('services.frontend.url'), '/');
    $appUrl = rtrim((string) config('app.url'), '/');

    abort_if($frontendUrl === '' || $frontendUrl === $appUrl, 404);

    $query = $request->query();
    $target = $frontendUrl.'/billing/return'.($query ? '?'.http_build_query($query) : '');

    return redirect()->away($target);
});

Route::get('/auth/reset-password', function (Request $request) {
    $frontendUrl = rtrim((string) config('services.frontend.url'), '/');
    $appUrl = rtrim((string) config('app.url'), '/');

    if ($frontendUrl !== '' && $frontendUrl !== $appUrl) {
        return redirect()->away($frontendUrl.'/auth/reset-password?'.http_build_query($request->only(['token', 'email'])));
    }

    $token = e((string) $request->query('token'));
    $email = e((string) $request->query('email'));

    return response(<<<HTML
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recuperar contrasena - NidoQuest</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Arial, sans-serif; background: #f6fbf9; color: #12343b; }
    form { width: min(420px, calc(100vw - 32px)); display: grid; gap: 14px; padding: 28px; border: 1px solid #cfe7e4; border-radius: 8px; background: #fff; }
    h1 { margin: 0 0 4px; font-size: 28px; }
    label { display: grid; gap: 6px; font-weight: 700; }
    input, button { min-height: 44px; border-radius: 8px; border: 1px solid #cfe7e4; padding: 0 12px; font: inherit; }
    button { border: 0; background: #183d3b; color: #fff; font-weight: 800; cursor: pointer; }
    p { margin: 0; color: #5d7370; }
    .message { min-height: 20px; font-weight: 700; }
  </style>
</head>
<body>
  <form id="reset-form">
    <h1>Recuperar contrasena</h1>
    <p>Escribe tu nueva contrasena para volver a entrar a NidoQuest.</p>
    <input type="hidden" name="token" value="{$token}">
    <label>Correo<input name="email" type="email" value="{$email}" required></label>
    <label>Nueva contrasena<input name="password" type="password" minlength="10" required></label>
    <label>Confirmar contrasena<input name="password_confirmation" type="password" minlength="10" required></label>
    <button type="submit">Cambiar contrasena</button>
    <p class="message" id="message"></p>
  </form>
  <script>
    document.getElementById('reset-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const message = document.getElementById('message');
      message.textContent = 'Actualizando...';
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      message.textContent = data.message || (response.ok ? 'Contrasena actualizada.' : 'No pudimos actualizar la contrasena.');
    });
  </script>
</body>
</html>
HTML);
});
