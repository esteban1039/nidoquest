<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class WompiService
{
    public function createCheckout(Tenant $tenant, User $user): Payment
    {
        $amount = (int) config('services.wompi.annual_price_cop');
        $currency = 'COP';
        $reference = 'nidoquest-'.$tenant->id.'-'.Str::uuid();
        $expirationTime = Carbon::now('UTC')->addHours(2)->format('Y-m-d\TH:i:s.v\Z');
        $signature = $this->checkoutIntegritySignature($reference, $amount, $currency, $expirationTime);
        $redirectUrl = rtrim((string) config('app.url'), '/').'/billing/return';
        $checkoutUrl = $this->checkoutUrl([
            'public-key' => config('services.wompi.public_key'),
            'currency' => $currency,
            'amount-in-cents' => $amount,
            'reference' => $reference,
            'signature:integrity' => $signature,
            'redirect-url' => $redirectUrl,
            'expiration-time' => $expirationTime,
            'customer-data:email' => $user->email,
            'customer-data:full-name' => $user->name,
        ]);

        return Payment::create([
            'tenant_id' => $tenant->id,
            'user_id' => $user->id,
            'provider' => 'wompi',
            'provider_reference' => $reference,
            'status' => 'pending',
            'amount_cents' => $amount,
            'currency' => $currency,
            'payload' => [
                'public_key' => config('services.wompi.public_key'),
                'currency' => $currency,
                'amount_in_cents' => $amount,
                'reference' => $reference,
                'signature_integrity' => $signature,
                'redirect_url' => $redirectUrl,
                'expiration_time' => $expirationTime,
                'checkout_url' => $checkoutUrl,
            ],
        ]);
    }

    public function checkoutIntegritySignature(string $reference, int $amountInCents, string $currency = 'COP', ?string $expirationTime = null): string
    {
        $secret = (string) config('services.wompi.integrity_secret');
        $payload = $reference.$amountInCents.$currency.($expirationTime ?? '').$secret;

        return hash('sha256', $payload);
    }

    public function verifyEventChecksum(array $payload, ?string $headerChecksum = null): bool
    {
        $secret = (string) config('services.wompi.events_secret');

        if ($secret === '') {
            return ! app()->isProduction();
        }

        $properties = (array) data_get($payload, 'signature.properties', []);
        $timestamp = (string) data_get($payload, 'timestamp', '');
        $checksum = strtolower((string) ($headerChecksum ?: data_get($payload, 'signature.checksum', '')));

        $concatenated = collect($properties)
            ->map(fn (string $property) => (string) data_get($payload['data'] ?? [], $property, ''))
            ->implode('');

        $expected = strtolower(hash('sha256', $concatenated.$timestamp.$secret));

        return $checksum !== '' && hash_equals($expected, $checksum);
    }

    public function fetchTransaction(string $transactionId): array
    {
        return Http::withToken(config('services.wompi.private_key'))
            ->get(config('services.wompi.base_url').'/transactions/'.$transactionId)
            ->throw()
            ->json('data');
    }

    private function checkoutUrl(array $params): string
    {
        return 'https://checkout.wompi.co/p/?'.http_build_query($params);
    }
}
