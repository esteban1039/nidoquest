<?php

namespace App\Http\Middleware;

use App\Services\SubscriptionAccessService;
use App\Services\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSubscriptionAccess
{
    public function __construct(
        private readonly SubscriptionAccessService $subscriptions,
        private readonly TenantContext $tenantContext,
    ) {
    }

    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->isSuperAdmin()) {
            return $next($request);
        }

        $access = $this->subscriptions->statusForTenant($this->tenantContext->get());

        if ($access['allowed']) {
            return $next($request);
        }

        return response()->json([
            'message' => $access['message'],
            'billing_required' => true,
            'subscription' => [
                'state' => $access['state'],
                'trial_ends_at' => $access['trial_ends_at'] ?? null,
            ],
        ], 402);
    }
}
