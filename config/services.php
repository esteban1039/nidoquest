<?php

return [
    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'https://api.mailgun.net'),
        'from' => env('MAIL_FROM_ADDRESS', 'soporte@nidoquest.com'),
        'from_name' => env('MAIL_FROM_NAME', 'NidoQuest'),
    ],

    'frontend' => [
        'url' => env('FRONTEND_URL', ''),
    ],

    'wompi' => [
        'base_url' => env('WOMPI_BASE_URL', 'https://production.wompi.co/v1'),
        'public_key' => env('WOMPI_PUBLIC_KEY'),
        'private_key' => env('WOMPI_PRIVATE_KEY'),
        'events_secret' => env('WOMPI_EVENTS_SECRET'),
        'integrity_secret' => env('WOMPI_INTEGRITY_SECRET'),
        'annual_price_cop' => (int) env('WOMPI_ANNUAL_PRICE_COP', 15000000),
    ],
];
