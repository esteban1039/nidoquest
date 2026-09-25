<?php

use App\Http\Middleware\EnsureTenantAccess;
use App\Http\Middleware\EnsureSubscriptionAccess;
use App\Http\Middleware\RecordAuditLog;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Sin EnsureFrontendRequestsAreStateful a propósito: la API autentica
        // solo por token y ese middleware convertía los POST del navegador en
        // sesión web, devolviendo 419 (ver tests/Feature/AuthLoginTest.php).
        $middleware->alias([
            'tenant' => EnsureTenantAccess::class,
            'subscription' => EnsureSubscriptionAccess::class,
            'audit' => RecordAuditLog::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
