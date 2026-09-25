# MUSE.md — NidoQuest

Monorepo SaaS multitenant de hábitos familiares (misiones, estrellas, recompensas).

## Estructura

- Raíz (`/`): backend **Laravel 12** API REST (`app/`, `routes/api.php`, `config/`, `database/`).
- `frontend/`: app **Nuxt 4 + Vue 3 + TS** (`srcDir: app/`, Nitro preset `cloudflare_pages`).

## Stack

- Backend: PHP `^8.2`, `laravel/framework ^12`, Sanctum `^4`, Guzzle `^7`, Pint + PHPUnit `^11` (dev, sin dir `tests/` aún).
- Frontend: Node `22.18.0`, npm `>=11.16`, `nuxt 4.4.6`, `@nuxtjs/i18n 9`, `vue 3.5`, `vue-router 4`.
- Datos: PostgreSQL (`pgsql`), una sola DB con `tenant_id`. Redis, S3 compatible Hetzner, Mailgun, push web VAPID.

## Contrato multitenant (obligatorio)

- Header en llamadas autenticadas: `X-Tenant-ID: 1` + `Authorization: Bearer {token}`.
- Middleware en `routes/api.php`: `auth:sanctum` → `tenant` → `audit`, y dentro `subscription` para casi todo el dominio.
- Modelos de negocio usan `App\Models\Concerns\BelongsToTenant`; `TenantContext` resuelve el tenant actual.
- Roles: `super_admin` (puede ir sin tenant o forzarlo), `guide` y `explorer` limitados a sus Nidos.
- Toda query de negocio debe scoper por tenant; nunca exponer datos cross-tenant. Verificar con `app/Http/Middleware/EnsureTenantAccess.php` y `app/Policies/*`.

## Invariantes de dominio (no romper)

- `star_movements` nunca se eliminan; son el ledger.
- Redimir recompensa crea movimiento negativo al **aprobarse** (`RewardRedemptionService`).
- Ajustes negativos de estrellas usan mensajes amables, no punitivos.
- Flujo misión: `submit` → `approve` / `reject`; redención: `redeem` → `approve` / `reject` → `deliver`.
- Servicios fuente de verdad: `StarService`, `RewardRedemptionService`, `SubscriptionService` + `SubscriptionAccessService`, `WompiService`, `AuditLogService` (vía middleware `RecordAuditLog`).

## Pagos Wompi

- Checkout Web con `signature:integrity`; webhook valida `X-Event-Checksum` o `signature.checksum` si hay `WOMPI_EVENTS_SECRET`.
- Vars: `WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_EVENTS_SECRET`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_BASE_URL`, `WOMPI_ANNUAL_PRICE_COP`, `WOMPI_TRIAL_DAYS`.
- No loguear secretos ni firmas completas.

## Comandos

Backend (desde raíz):

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
./vendor/bin/pint --test
php artisan test
```

Tests (PHPUnit 11, `tests/`): la API autentica solo por token, sin
`EnsureFrontendRequestsAreStateful` (ese middleware causaba 419 en los POST
del navegador; ver `tests/Feature/AuthLoginTest.php`). Los tests usan la base
`nidoquest_testing` — crearla una vez con
`psql -c "CREATE DATABASE nidoquest_testing"`; nunca tocan la de desarrollo.

Frontend (desde `frontend/`):

```bash
npm install
npm run dev    # :3000, proxy /api al backend
npm run build
```

Vars frontend: `NUXT_PUBLIC_API_BASE=/api`, `NUXT_BACKEND_API_BASE=http://127.0.0.1:8000/api`, `NUXT_PUBLIC_VAPID_PUBLIC_KEY`.

Demo seed: `admin@nidoquest.test` / `guia@nidoquest.test`, password `Password123!`.

## Convenciones

- Backend: FormRequests en `app/Http/Requests/*`, Resources en `app/Http/Resources/*`, Policies por modelo, lógica de negocio en `app/Services/*`, no en controladores.
- Frontend: páginas en `frontend/app/pages/` (`auth/`, `dashboard/guide|explorer|admin`, `billing/`, `onboarding/`), sesión con `useCookie` + Sanctum token (`useSession`, `useApi`), i18n `es-LATAM` (default), `en`, `fr` en `frontend/i18n/locales/`.
- Idioma UI por defecto: español LATAM, tono familiar amable.
- Seguridad: nunca commitear `.env`; usar `.env.example` como referencia.
