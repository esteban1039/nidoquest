<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\SubscriptionService;
use App\Services\TenantContext;
use App\Services\WompiService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkout(TenantContext $tenantContext, WompiService $wompi)
    {
        $tenant = $tenantContext->get();
        abort_unless($tenant, 422, 'Selecciona un Nido para iniciar el pago.');

        $payment = $wompi->createCheckout($tenant, request()->user());

        return response()->json([
            'data' => [
                'payment_id' => $payment->id,
                'status' => $payment->status,
                'amount_cents' => $payment->amount_cents,
                'currency' => $payment->currency,
                'reference' => $payment->provider_reference,
                'checkout' => $payment->payload,
            ],
        ], 201);
    }

    public function webhook(Request $request, SubscriptionService $subscriptions, WompiService $wompi)
    {
        abort_unless($wompi->verifyEventChecksum($request->all(), $request->header('X-Event-Checksum')), 401, 'Invalid Wompi event checksum.');

        $reference = data_get($request->all(), 'data.transaction.reference') ?? data_get($request->all(), 'data.id');
        $status = data_get($request->all(), 'data.transaction.status') ?? data_get($request->all(), 'data.status');

        $payment = Payment::where('provider_reference', $reference)->firstOrFail();
        $payment->update([
            'status' => $status ?: 'pending',
            'payload' => array_merge($payment->payload ?? [], ['webhook' => $request->all()]),
        ]);

        if (in_array($status, ['APPROVED', 'approved'], true)) {
            $subscriptions->activateAnnual($payment->tenant, $payment);
        }

        return response()->json(['received' => true]);
    }

    public function subscriptionStatus(TenantContext $tenantContext, \App\Services\SubscriptionAccessService $subscriptions)
    {
        $tenant = $tenantContext->get();

        return response()->json([
            'data' => [
                'subscription' => $tenant?->subscription()->latest()->first(),
                'access' => $subscriptions->statusForTenant($tenant),
            ],
        ]);
    }

    public function transactionStatus(string $transactionId, WompiService $wompi, SubscriptionService $subscriptions)
    {
        $transaction = $wompi->fetchTransaction($transactionId);
        $reference = data_get($transaction, 'reference');
        $payment = $reference ? Payment::where('provider_reference', $reference)->first() : null;
        $status = data_get($transaction, 'status');

        if ($payment) {
            $payment->update([
                'status' => $status ?: $payment->status,
                'payload' => array_merge($payment->payload ?? [], ['transaction' => $transaction]),
                'paid_at' => $status === 'APPROVED' ? now() : $payment->paid_at,
            ]);

            if ($status === 'APPROVED') {
                $subscriptions->activateAnnual($payment->tenant, $payment);
            }
        }

        return response()->json(['data' => $transaction]);
    }
}
