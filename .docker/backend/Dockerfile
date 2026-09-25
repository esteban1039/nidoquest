FROM php:8.2-cli-bookworm

# Extensiones necesarias para Laravel 12 + pgsql + redis (phpredis)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    curl \
  && docker-php-ext-install -j$(nproc) pdo_pgsql zip bcmath pcntl \
  && pecl install redis \
  && docker-php-ext-enable redis \
  && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY .docker/backend/entrypoint.sh /usr/local/bin/nidoquest-entrypoint.sh
RUN chmod +x /usr/local/bin/nidoquest-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["nidoquest-entrypoint.sh"]
