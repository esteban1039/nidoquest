<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreExplorerRequest;
use App\Http\Resources\ExplorerResource;
use App\Models\Explorer;
use App\Models\User;
use App\Services\TenantContext;
use Illuminate\Support\Facades\DB;

class ExplorerController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        return ExplorerResource::collection(Explorer::forTenant($tenantContext->id())->latest()->paginate());
    }

    public function store(StoreExplorerRequest $request, TenantContext $tenantContext)
    {
        $data = $request->validated();

        $explorer = DB::transaction(function () use ($data, $request, $tenantContext) {
            $user = null;

            if (! empty($data['email']) && ! empty($data['password'])) {
                $user = User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' => $data['password'],
                    'role' => User::ROLE_EXPLORER,
                    'locale' => $request->user()->locale,
                ]);

                $user->tenants()->attach($tenantContext->id(), ['role' => User::ROLE_EXPLORER]);
            }

            return Explorer::create([
                'tenant_id' => $tenantContext->id(),
                'guide_id' => $request->user()->id,
                'user_id' => $user?->id,
                'name' => $data['name'],
                'birthdate' => $data['birthdate'] ?? null,
                'avatar' => $data['avatar'] ?? null,
                'preferences' => $data['preferences'] ?? null,
            ]);
        });

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
