<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use App\Services\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantAccess
{
    public function __construct(private readonly TenantContext $tenantContext)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if ($user->isSuperAdmin()) {
            $tenantId = $request->header('X-Tenant-ID') ?? $request->input('tenant_id');
            $this->tenantContext->set($tenantId ? Tenant::find($tenantId) : null);

            return $next($request);
        }

        $tenantId = $request->header('X-Tenant-ID') ?? $request->input('tenant_id');

        if (! $tenantId) {
            $tenantId = $user->tenants()->value('tenants.id');
        }

        $tenant = $tenantId ? Tenant::find($tenantId) : null;

        if (! $tenant || ! $user->belongsToTenant((int) $tenant->id)) {
            return response()->json(['message' => 'No tienes acceso a este Nido.'], 403);
        }

        $this->tenantContext->set($tenant);
        $request->merge(['tenant_id' => $tenant->id]);

        return $next($request);
    }
}
