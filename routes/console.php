<?php

use Illuminate\Support\Facades\Artisan;
use App\Models\User;

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
        ],
    );

    $this->info("Super admin listo: {$user->email}");
});
