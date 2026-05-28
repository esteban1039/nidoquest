<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Subscription;
use App\Models\Tenant;
use Illuminate\Support\Carbon;

class SubscriptionService
{
    public function activateAnnual(Tenant $tenant, Payment $payment): Subscription
    {
        $subscription = $tenant->subscription()->latest()->first() ?? new Subscription([
            'tenant_id' => $tenant->id,
            'plan' => 'annual',
            'price_cents' => config('services.wompi.annual_price_cop'),
            'currency' => 'COP',
        ]);

        $subscription->fill([
            'status' => 'active',
            'starts_at' => Carbon::now(),
            'ends_at' => Carbon::now()->addYear(),
            'cancelled_at' => null,
        ])->save();

        $payment->update(['subscription_id' => $subscription->id, 'status' => 'approved', 'paid_at' => now()]);
        $tenant->update(['status' => 'active']);

        return $subscription;
    }
}
