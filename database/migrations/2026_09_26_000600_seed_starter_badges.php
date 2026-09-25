<?php

use App\Models\Tenant;
use App\Services\BadgeService;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $badges = app(BadgeService::class);

        Tenant::query()->each(fn (Tenant $tenant) => $badges->ensureStarterBadges($tenant));
    }

    public function down(): void
    {
        // Las insignias otorgadas a exploradores se conservan; solo se
        // podrían remover las definiciones sin uso, lo cual no se hace aquí.
    }
};
