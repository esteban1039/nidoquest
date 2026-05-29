<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ExplorerController;
use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\GrowthAreaController;
use App\Http\Controllers\Api\MissionController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OnboardingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\RewardController;
use App\Http\Controllers\Api\RewardRedemptionController;
use App\Http\Controllers\Api\StarController;
use App\Http\Controllers\Api\TenantController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:api')->group(function (): void {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/payments/wompi/webhook', [PaymentController::class, 'webhook']);

    Route::middleware(['auth:sanctum', 'tenant', 'audit'])->group(function (): void {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/me/password', [AuthController::class, 'changePassword']);
        Route::post('/onboarding/starter', [OnboardingController::class, 'store']);
        Route::get('/growth-areas', [GrowthAreaController::class, 'index']);
        Route::get('/guides', [GuideController::class, 'index']);
        Route::post('/guides', [GuideController::class, 'store']);
        Route::put('/guides/{guide}', [GuideController::class, 'update']);

        Route::apiResource('nests', TenantController::class)->parameters(['nests' => 'nest'])->except(['destroy']);
        Route::apiResource('explorers', ExplorerController::class);
        Route::apiResource('missions', MissionController::class);
        Route::post('/missions/{mission}/submit', [MissionController::class, 'submit']);
        Route::post('/missions/{mission}/approve', [MissionController::class, 'approve']);
        Route::post('/missions/{mission}/reject', [MissionController::class, 'reject']);

        Route::get('/explorers/{explorer}/stars', [StarController::class, 'balance']);
        Route::get('/explorers/{explorer}/star-movements', [StarController::class, 'movements']);
        Route::post('/explorers/{explorer}/adjust-stars', [StarController::class, 'adjust']);

        Route::apiResource('rewards', RewardController::class);
        Route::post('/rewards/{reward}/redeem', [RewardController::class, 'redeem']);

        Route::get('/reward-redemptions', [RewardRedemptionController::class, 'index']);
        Route::post('/reward-redemptions/{redemption}/approve', [RewardRedemptionController::class, 'approve']);
        Route::post('/reward-redemptions/{redemption}/reject', [RewardRedemptionController::class, 'reject']);
        Route::post('/reward-redemptions/{redemption}/deliver', [RewardRedemptionController::class, 'deliver']);

        Route::get('/dashboard/guide', [DashboardController::class, 'guide']);
        Route::get('/dashboard/explorer/{explorer}', [DashboardController::class, 'explorer']);
        Route::get('/dashboard/admin', [DashboardController::class, 'admin']);

        Route::post('/payments/wompi/checkout', [PaymentController::class, 'checkout']);
        Route::get('/payments/wompi/transactions/{transactionId}', [PaymentController::class, 'transactionStatus']);
        Route::get('/subscription/status', [PaymentController::class, 'subscriptionStatus']);

        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::post('/notifications/subscriptions', [NotificationController::class, 'storeSubscription']);
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markRead']);
    });
});
