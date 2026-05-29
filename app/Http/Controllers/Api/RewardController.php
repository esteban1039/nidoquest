<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reward\StoreRewardRequest;
use App\Http\Resources\RewardResource;
use App\Models\Explorer;
use App\Models\Reward;
use App\Services\RewardRedemptionService;
use App\Services\TenantContext;
use Illuminate\Validation\ValidationException;

class RewardController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        return RewardResource::collection(Reward::forTenant($tenantContext->id())->latest()->paginate());
    }

    public function store(StoreRewardRequest $request, TenantContext $tenantContext)
    {
        return RewardResource::make(Reward::create($request->validated() + ['tenant_id' => $tenantContext->id()]));
    }

    public function show(Reward $reward)
    {
        $this->authorize('view', $reward);

        return RewardResource::make($reward);
    }

    public function update(StoreRewardRequest $request, Reward $reward)
    {
        $this->authorize('manage', $reward);
        $reward->update($request->validated());

        return RewardResource::make($reward);
    }

    public function destroy(Reward $reward)
    {
        $this->authorize('manage', $reward);
        $reward->delete();

        return response()->noContent();
    }

    public function redeem(Reward $reward, RewardRedemptionService $redemptions)
    {
        $this->authorize('view', $reward);

        if (! $reward->active) {
            throw ValidationException::withMessages([
                'reward_id' => 'Esta recompensa no esta activa.',
            ]);
        }

        $explorer = Explorer::where('tenant_id', $reward->tenant_id)
            ->when(request()->user()->role === 'explorer', fn ($query) => $query->where('user_id', request()->user()->id))
            ->findOrFail(request('explorer_id'));

        $redemption = $redemptions->request($explorer, $reward, request('note'));

        return response()->json(['data' => $redemption], 201);
    }
}
