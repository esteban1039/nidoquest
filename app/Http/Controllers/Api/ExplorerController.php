<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreExplorerRequest;
use App\Http\Resources\ExplorerResource;
use App\Models\Explorer;
use App\Models\User;
use App\Services\EmailService;
use App\Services\TenantContext;
use Illuminate\Support\Facades\DB;

class ExplorerController extends Controller
{
    public function __construct(private readonly EmailService $email)
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
            $rawIdentifier = ! empty($data['email']) ? trim($data['email']) : null;
            $userEmail = $rawIdentifier ? (str_contains($rawIdentifier, '@') ? $rawIdentifier : \Illuminate\Support\Str::slug($rawIdentifier).'@nidoquest.local') : null;

            if ($userEmail && ! empty($data['password'])) {
                $user = User::create([
                    'name' => $data['name'],
                    'email' => $userEmail,
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

        if ($explorer->user && ! empty($data['password']) && str_contains($explorer->user->email, '@') && ! str_ends_with($explorer->user->email, '@nidoquest.local')) {
            $this->email->sendWelcome($explorer->user, $data['password']);
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

        DB::transaction(function () use ($data, $explorer, $request): void {
            $explorer->update([
                'name' => $data['name'],
                'status' => $data['status'] ?? $explorer->status,
                'birthdate' => $data['birthdate'] ?? $explorer->birthdate,
                'avatar' => $data['avatar'] ?? $explorer->avatar,
                'preferences' => $data['preferences'] ?? $explorer->preferences,
            ]);

            if (! empty($data['email'])) {
                $rawIdentifier = trim($data['email']);
                $userEmail = str_contains($rawIdentifier, '@') ? $rawIdentifier : \Illuminate\Support\Str::slug($rawIdentifier).'@nidoquest.local';

                if ($explorer->user) {
                    $explorer->user->update([
                        'name' => $data['name'],
                        'email' => $userEmail,
                        'active' => ($data['status'] ?? $explorer->status) === 'active',
                        ...(! empty($data['password']) ? ['password' => $data['password']] : []),
                    ]);
                } elseif (! empty($data['password'])) {
                    $user = User::create([
                        'name' => $data['name'],
                        'email' => $userEmail,
                        'password' => $data['password'],
                        'role' => User::ROLE_EXPLORER,
                        'locale' => $request->user()->locale,
                    ]);
                    $user->tenants()->attach($explorer->tenant_id, ['role' => User::ROLE_EXPLORER]);
                    $explorer->update(['user_id' => $user->id]);
                }
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
