<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreExplorerRequest;
use App\Http\Resources\ExplorerResource;
use App\Models\Explorer;
use App\Services\TenantContext;

class ExplorerController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        return ExplorerResource::collection(Explorer::forTenant($tenantContext->id())->latest()->paginate());
    }

    public function store(StoreExplorerRequest $request, TenantContext $tenantContext)
    {
        $explorer = Explorer::create($request->validated() + [
            'tenant_id' => $tenantContext->id(),
            'guide_id' => $request->user()->id,
        ]);

        return ExplorerResource::make($explorer);
    }

    public function show(Explorer $explorer)
    {
        $this->authorize('view', $explorer);

        return ExplorerResource::make($explorer);
    }

    public function update(StoreExplorerRequest $request, Explorer $explorer)
    {
        $this->authorize('manage', $explorer);
        $explorer->update($request->validated());

        return ExplorerResource::make($explorer);
    }

    public function destroy(Explorer $explorer)
    {
        $this->authorize('manage', $explorer);
        $explorer->delete();

        return response()->noContent();
    }
}
