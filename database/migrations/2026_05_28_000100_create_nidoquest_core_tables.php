<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('status')->default('trial')->index();
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('timezone')->default('America/Bogota');
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->index('created_at');
        });

        Schema::create('tenant_user', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role')->default('guide')->index();
            $table->timestamps();
            $table->unique(['tenant_id', 'user_id']);
            $table->index(['tenant_id', 'role']);
            $table->index('created_at');
        });

        Schema::create('growth_areas', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->string('color')->nullable();
            $table->boolean('active')->default(true)->index();
            $table->timestamps();
            $table->unique(['tenant_id', 'slug']);
            $table->index(['tenant_id', 'active']);
            $table->index('created_at');
        });

        Schema::create('explorers', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('guide_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('name');
            $table->date('birthdate')->nullable();
            $table->string('avatar')->nullable();
            $table->string('status')->default('active')->index();
            $table->json('preferences')->nullable();
            $table->timestamps();
            $table->index(['tenant_id', 'status']);
            $table->index('user_id');
            $table->index('created_at');
        });

        Schema::create('missions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('growth_area_id')->constrained()->restrictOnDelete();
            $table->foreignId('explorer_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedInteger('stars')->default(1);
            $table->string('frequency')->default('once')->index();
            $table->dateTime('due_date')->nullable()->index();
            $table->time('suggested_time')->nullable();
            $table->boolean('evidence_required')->default(false);
            $table->string('evidence_type')->default('none');
            $table->string('difficulty')->default('easy');
            $table->string('status')->default('pending')->index();
            $table->string('motivational_message')->nullable();
            $table->boolean('active')->default(true)->index();
            $table->timestamps();
            $table->index(['tenant_id', 'explorer_id', 'status']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('missions');
        Schema::dropIfExists('explorers');
        Schema::dropIfExists('growth_areas');
        Schema::dropIfExists('tenant_user');
        Schema::dropIfExists('tenants');
    }
};
