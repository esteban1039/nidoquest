<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreExplorerRequest;
use App\Http\Resources\ExplorerResource;
use App\Models\Explorer;
use App\Models\User;
use App\Services\MailgunEmailService;
use App\Services\TenantContext;
use Illuminate\Support\Facades\DB;

class ExplorerController extends Controller
{
    public function __construct(private readonly MailgunEmailService $mailgun)
    {
    }

    public function index(TenantContext $tenantContext)
    {
        $query = Explorer::forTenant($tenantContext->id())->with('user')->latest();

        if (request()->user()->role === User::ROLE_EXPLORER) {
            $query->where('user_id', request()->user()->id);
        }

        return ExplorerResource::collection($query->paginate());
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

        if ($explorer->user && ! empty($data['password'])) {
            $this->mailgun->sendWelcome($explorer->user, $data['password']);
        }

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
        $data = $request->validated();

        DB::transaction(function () use ($data, $explorer): void {
            $explorer->update([
                'name' => $data['name'],
                'status' => $data['status'] ?? $explorer->status,
                'birthdate' => $data['birthdate'] ?? $explorer->birthdate,
                'avatar' => $data['avatar'] ?? $explorer->avatar,
                'preferences' => $data['preferences'] ?? $explorer->preferences,
            ]);

            if ($explorer->user && ! empty($data['email'])) {
                $explorer->user->update([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'active' => ($data['status'] ?? $explorer->status) === 'active',
                    ...(! empty($data['password']) ? ['password' => $data['password']] : []),
                ]);
            }
        });

        return ExplorerResource::make($explorer);
    }

    public function destroy(Explorer $explorer)
    {
        $this->authorize('manage', $explorer);
        $explorer->delete();

        return response()->noContent();
    }
}
