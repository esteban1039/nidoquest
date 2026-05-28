<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RewardRedemption;
use App\Services\RewardRedemptionService;
use App\Services\TenantContext;

class RewardRedemptionController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        return response()->json([
            'data' => RewardRedemption::forTenant($tenantContext->id())->with(['reward', 'explorer'])->latest()->paginate(),
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
        $redemption->update(['status' => 'rejected', 'approved_by' => request()->user()->id]);

        return response()->json(['data' => $redemption]);
    }

    public function deliver(RewardRedemption $redemption)
    {
        $this->authorize('manage', $redemption->reward);
        $redemption->update(['status' => 'delivered', 'delivered_at' => now()]);

        return response()->json(['data' => $redemption]);
    }
}
