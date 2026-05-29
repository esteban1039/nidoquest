<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\RewardRedemption;
use App\Services\RewardRedemptionService;
use App\Services\TenantContext;
use Illuminate\Validation\ValidationException;

class RewardRedemptionController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        $query = RewardRedemption::forTenant($tenantContext->id())
            ->with(['reward', 'explorer'])
            ->latest();

        if (request()->user()->role === User::ROLE_EXPLORER) {
            $query->whereHas('explorer', fn ($explorerQuery) => $explorerQuery->where('user_id', request()->user()->id));
        }

        return response()->json([
            'data' => $query->paginate(),
        ]);
    }

    public function approve(RewardRedemption $redemption, RewardRedemptionService $service)
    {
        $this->authorize('manage', $redemption->reward);

        return response()->json(['data' => $service->approve($redemption, request()->user())]);
    }

    public function reject(RewardRedemption $redemption)
    {
        $this->authorize('manage', $redemption->reward);

        if ($redemption->status !== 'requested') {
            throw ValidationException::withMessages([
                'redemption_id' => 'Solo puedes rechazar solicitudes pendientes.',
            ]);
        }

        $redemption->update(['status' => 'rejected', 'approved_by' => request()->user()->id]);

        return response()->json(['data' => $redemption]);
    }

    public function deliver(RewardRedemption $redemption)
    {
        $this->authorize('manage', $redemption->reward);

        if ($redemption->status !== 'approved') {
            throw ValidationException::withMessages([
                'redemption_id' => 'Solo puedes entregar recompensas aprobadas.',
            ]);
        }

        $redemption->update(['status' => 'delivered', 'delivered_at' => now()]);

        return response()->json(['data' => $redemption]);
    }
}
