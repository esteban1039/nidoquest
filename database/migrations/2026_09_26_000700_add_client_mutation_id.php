<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mission_submissions', function (Blueprint $table): void {
            $table->string('client_mutation_id', 64)->nullable()->after('explorer_id');
        });
        Schema::table('reward_redemptions', function (Blueprint $table): void {
            $table->string('client_mutation_id', 64)->nullable()->after('explorer_id');
        });

        // La cola offline reintenta con el mismo id: el servidor responde con
        // el registro ya creado en vez de duplicarlo.
        DB::statement('CREATE UNIQUE INDEX mission_submissions_tenant_mutation_unique ON mission_submissions (tenant_id, client_mutation_id) WHERE client_mutation_id IS NOT NULL');
        DB::statement('CREATE UNIQUE INDEX reward_redemptions_tenant_mutation_unique ON reward_redemptions (tenant_id, client_mutation_id) WHERE client_mutation_id IS NOT NULL');
    }

    public function down(): void
    {
        Schema::table('reward_redemptions', function (Blueprint $table): void {
            $table->dropColumn('client_mutation_id');
        });
        Schema::table('mission_submissions', function (Blueprint $table): void {
            $table->dropColumn('client_mutation_id');
        });
    }
};
