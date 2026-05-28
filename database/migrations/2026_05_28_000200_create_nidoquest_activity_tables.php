<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mission_schedules', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('mission_id')->constrained()->cascadeOnDelete();
            $table->json('days_of_week')->nullable();
            $table->date('starts_at')->nullable();
            $table->date('ends_at')->nullable();
            $table->json('custom_rule')->nullable();
            $table->timestamps();
            $table->index(['tenant_id', 'mission_id']);
            $table->index('created_at');
        });

        Schema::create('mission_submissions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('mission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('explorer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('submitted')->index();
            $table->text('evidence_text')->nullable();
            $table->string('evidence_path')->nullable();
            $table->text('guide_feedback')->nullable();
            $table->timestamp('submitted_at')->nullable()->index();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
            $table->index(['tenant_id', 'explorer_id', 'status']);
            $table->index('mission_id');
            $table->index('created_at');
        });

        Schema::create('rewards', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedInteger('stars_cost');
            $table->string('category')->nullable()->index();
            $table->string('type')->default('custom')->index();
            $table->boolean('requires_approval')->default(true);
            $table->unsignedInteger('limit_per_day')->nullable();
            $table->unsignedInteger('limit_per_week')->nullable();
            $table->string('image')->nullable();
            $table->boolean('active')->default(true)->index();
            $table->timestamps();
            $table->index(['tenant_id', 'active']);
            $table->index('created_at');
        });

        Schema::create('star_movements', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('explorer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('mission_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('reward_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type')->index();
            $table->integer('amount');
            $table->text('reason')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index(['tenant_id', 'explorer_id']);
            $table->index('created_by');
            $table->index('created_at');
        });

        Schema::create('reward_redemptions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reward_id')->constrained()->cascadeOnDelete();
            $table->foreignId('explorer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('requested')->index();
            $table->unsignedInteger('stars_cost');
            $table->text('note')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
            $table->index(['tenant_id', 'explorer_id', 'status']);
            $table->index('reward_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reward_redemptions');
        Schema::dropIfExists('star_movements');
        Schema::dropIfExists('rewards');
        Schema::dropIfExists('mission_submissions');
        Schema::dropIfExists('mission_schedules');
    }
};
