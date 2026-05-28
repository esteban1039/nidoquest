<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NotificationSubscription;
use App\Services\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'data' => DB::table('notifications')
                ->where('notifiable_type', $request->user()::class)
                ->where('notifiable_id', $request->user()->id)
                ->latest('created_at')
                ->paginate(),
        ]);
    }

    public function storeSubscription(Request $request, TenantContext $tenantContext)
    {
        $data = $request->validate([
            'endpoint' => ['required', 'url', 'max:2048'],
            'keys' => ['nullable', 'array'],
            'preferences' => ['nullable', 'array'],
        ]);

        $subscription = NotificationSubscription::updateOrCreate(
            ['endpoint' => $data['endpoint']],
            [
                'tenant_id' => $tenantContext->id(),
                'user_id' => $request->user()->id,
                'channel' => 'web_push',
                'keys' => $data['keys'] ?? null,
                'preferences' => $data['preferences'] ?? ['missions' => true, 'rewards' => true, 'billing' => true],
                'active' => true,
            ]
        );

        return response()->json(['data' => $subscription], 201);
    }

    public function markRead(string $id, Request $request)
    {
        DB::table('notifications')
            ->where('id', $id)
            ->where('notifiable_type', $request->user()::class)
            ->where('notifiable_id', $request->user()->id)
            ->update(['read_at' => now()]);

        return response()->json(['read' => true]);
    }
}
