# NidoQuest Backend

Base backend de NidoQuest, SaaS multitenant para hábitos familiares con misiones, estrellas y recompensas sanas.

## Alcance de esta fase

- Laravel 12 API REST.
- PostgreSQL con una sola base de datos y aislamiento por `tenant_id`.
- Laravel Sanctum.
- Migraciones, modelos, relaciones, factories y seeders.
- Middleware multitenant.
- Policies base.
- Controladores y rutas API base.
- Servicios para estrellas, redenciones, suscripciones y Wompi.
- Firma de integridad Wompi para checkout y verificación de checksum en webhooks.
- API base para notificaciones y suscripciones push web.
- Configuración base para Redis, CORS y S3 compatible con Hetzner.

## Instalación

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Credenciales demo:

- `admin@nidoquest.test` / `Password123!`
- `guia@nidoquest.test` / `Password123!`

## Tenant actual

Para llamadas autenticadas, envía el header:

```http
X-Tenant-ID: 1
Authorization: Bearer {token}
```

Los `super_admin` pueden consultar sin tenant o forzar uno con `X-Tenant-ID`. Los `guide` y `explorer` quedan limitados a los Nidos asociados.

## Endpoints principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/me`
- `GET|POST|GET|PUT /api/nests`
- `GET|POST|GET|PUT|DELETE /api/explorers`
- `GET|POST|GET|PUT|DELETE /api/missions`
- `POST /api/missions/{mission}/submit`
- `POST /api/missions/{mission}/approve`
- `POST /api/missions/{mission}/reject`
- `GET /api/explorers/{explorer}/stars`
- `GET /api/explorers/{explorer}/star-movements`
- `POST /api/explorers/{explorer}/adjust-stars`
- `GET|POST|GET|PUT|DELETE /api/rewards`
- `POST /api/rewards/{reward}/redeem`
- `GET /api/reward-redemptions`
- `POST /api/reward-redemptions/{redemption}/approve`
- `POST /api/reward-redemptions/{redemption}/reject`
- `POST /api/reward-redemptions/{redemption}/deliver`
- `GET /api/dashboard/guide`
- `GET /api/dashboard/explorer/{explorer}`
- `GET /api/dashboard/admin`
- `POST /api/payments/wompi/checkout`
- `POST /api/payments/wompi/webhook`
- `GET /api/payments/wompi/transactions/{transactionId}`
- `GET /api/subscription/status`
- `GET /api/notifications`
- `POST /api/notifications/subscriptions`
- `POST /api/notifications/{id}/read`

## Wompi

Configura las variables:

```bash
WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=
WOMPI_EVENTS_SECRET=
WOMPI_INTEGRITY_SECRET=
WOMPI_BASE_URL=https://production.wompi.co/v1
WOMPI_ANNUAL_PRICE_COP=15000000
```

El checkout usa Web Checkout con `signature:integrity`; el webhook valida `X-Event-Checksum` o `signature.checksum` cuando `WOMPI_EVENTS_SECRET` está configurado.

## Notas

Los movimientos de estrellas no se eliminan. Las redenciones crean movimientos negativos al aprobarse, y los ajustes negativos usan mensajes amables para evitar una experiencia punitiva.
