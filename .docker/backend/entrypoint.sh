#!/bin/sh
set -e
cd /var/www/html

# 1. .env a partir del ejemplo si no existe (no sobreescribe el tuyo).
if [ ! -f .env ]; then
  cp .env.example .env
fi

# 1b. Sincroniza el .env con el entorno docker.
# `php artisan serve` arranca el servidor PHP sin heredar todas las variables,
# así que el .env debe traer los hostnames internos (db, redis), no 127.0.0.1.
set_value() { # set_value KEY VALUE
  if grep -q "^$1=" .env; then
    sed -i "s|^$1=.*|$1=$2|" .env
  else
    printf '%s=%s\n' "$1" "$2" >> .env
  fi
}
set_value DB_CONNECTION "${DB_CONNECTION:-pgsql}"
set_value DB_HOST "${DB_HOST:-db}"
set_value DB_PORT "${DB_PORT:-5432}"
set_value DB_DATABASE "${DB_DATABASE:-nidoquest}"
set_value DB_USERNAME "${DB_USERNAME:-postgres}"
set_value DB_PASSWORD "${DB_PASSWORD:-postgres}"
set_value REDIS_HOST "${REDIS_HOST:-redis}"
set_value REDIS_PORT "${REDIS_PORT:-6379}"
set_value APP_URL "${APP_URL:-http://localhost:8000}"
set_value FRONTEND_URL "${FRONTEND_URL:-http://localhost:3000}"

# 2. Directorios que Laravel exige (van gitignoreados y no existen en el repo).
mkdir -p bootstrap/cache storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs
find bootstrap/cache storage -not -name '.gitkeep' -exec chmod 775 {} + 2>/dev/null || true

# 3. Dependencias PHP.
if [ ! -d vendor ]; then
  composer install --no-interaction --prefer-dist
fi

# 3. Espera a PostgreSQL (los valores llegan por environment del compose).
DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"
echo "Esperando PostgreSQL en ${DB_HOST}:${DB_PORT}..."
until php -r "new PDO('pgsql:host=${DB_HOST};port=${DB_PORT};dbname=postgres', getenv('DB_USERNAME'), getenv('DB_PASSWORD'));" 2>/dev/null; do
  sleep 2
done

# 4. Clave de aplicación.
php artisan key:generate --force || true

# 5. Migraciones siempre; seed solo el primer arranque (marcador en storage).
php artisan migrate --force
seed_needed() {
  # exit 0 (= true) solo si la tabla users existe y está vacía.
  php -r '$pdo = new PDO(sprintf("pgsql:host=%s;port=%s;dbname=%s", getenv("DB_HOST") ?: "db", getenv("DB_PORT") ?: "5432", getenv("DB_DATABASE") ?: "nidoquest"), getenv("DB_USERNAME") ?: "postgres", getenv("DB_PASSWORD") ?: "postgres"); exit(((int) $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn()) > 0 ? 1 : 0);' 2>/dev/null
}

if [ ! -f bootstrap/cache/.docker-seeded ]; then
  if seed_needed; then
    php artisan db:seed --force && touch bootstrap/cache/.docker-seeded || echo "Seed falló, reintenta con: docker compose exec backend php artisan db:seed --force"
  else
    # Ya hay datos (o la tabla no es legible): no reseedear.
    touch bootstrap/cache/.docker-seeded
  fi
fi

find storage bootstrap/cache -not -name '.gitkeep' -exec chmod 775 {} + 2>/dev/null || true

# 6. Servidor de desarrollo.
exec php artisan serve --host=0.0.0.0 --port=8000
