<?php

namespace App\Http\Middleware;

use App\Models\AuditLog;
use App\Services\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RecordAuditLog
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->user() && ! $request->isMethodSafe() && $response->getStatusCode() < 500) {
            AuditLog::create([
                'tenant_id' => app(TenantContext::class)->id(),
                'user_id' => $request->user()->id,
                'action' => strtolower($request->method()).':'.$request->path(),
                'new_values' => $request->except(['password', 'password_confirmation', 'token']),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
        }

        return $response;
    }
}
