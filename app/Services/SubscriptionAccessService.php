<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\Tenant;
use Illuminate\Support\Carbon;

class SubscriptionAccessService
{
    public function statusForTenant(?Tenant $tenant): array
    {
        if (! $tenant) {
            return [
                'state' => 'missing',
                'allowed' => false,
                'message' => 'Selecciona un Nido para continuar.',
            ];
        }

        $subscription = $tenant->subscription()->latest()->first();

        if (! $subscription) {
            return [
                'state' => 'missing',
                'allowed' => false,
                'message' => 'Este Nido no tiene una suscripcion configurada.',
            ];
        }

        return $this->statusForSubscription($subscription);
    }

    public function statusForSubscription(Subscription $subscription): array
    {
        $now = Carbon::now();
        $trialEndsAt = $subscription->trial_ends_at;
        $endsAt = $subscription->ends_at;

        if ($subscription->status === 'active' && (! $endsAt || $endsAt->isFuture())) {
            return [
                'state' => 'active',
                'allowed' => true,
                'message' => 'Suscripcion activa.',
                'subscription' => $subscription,
            ];
        }

        if ($subscription->status === 'trial' && $trialEndsAt && $trialEndsAt->isFuture()) {
            return [
                'state' => 'trial',
                'allowed' => true,
                'message' => 'Prueba activa.',
                'trial_ends_at' => $trialEndsAt,
                'trial_days_remaining' => max(0, (int) ceil($now->diffInSeconds($trialEndsAt, false) / 86400)),
                'subscription' => $subscription,
            ];
        }

        return [
            'state' => $subscription->status === 'trial' ? 'trial_expired' : 'expired',
            'allowed' => false,
            'message' => 'La prueba gratuita de 7 dias termino. Activa el plan anual para continuar usando NidoQuest.',
            'trial_ends_at' => $trialEndsAt,
            'subscription' => $subscription,
        ];
    }
}
