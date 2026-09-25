<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\StoreTenantRequest;
use App\Http\Resources\TenantResource;
use App\Models\Setting;
use App\Models\Tenant;
use App\Models\Subscription;
use App\Services\BadgeService;
use App\Services\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TenantController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->isSuperAdmin() ? Tenant::query() : $request->user()->tenants();

        return TenantResource::collection($query->latest()->paginate());
    }

    public function store(StoreTenantRequest $request)
    {
        $tenant = DB::transaction(function () use ($request) {
            $tenant = Tenant::create([
                'name' => $request->validated('name'),
                'slug' => Str::slug($request->validated('name')).'-'.Str::lower(Str::random(5)),
                'status' => 'trial',
                'owner_id' => $request->user()->id,
                'timezone' => $request->input('timezone', 'America/Bogota'),
            ]);

            $tenant->users()->attach($request->user()->id, ['role' => 'guide']);

            Subscription::create([
                'tenant_id' => $tenant->id,
                'plan' => 'annual',
                'status' => 'trial',
                'price_cents' => (int) config('services.wompi.annual_price_cop'),
                'currency' => 'COP',
                'trial_ends_at' => now()->addDays((int) config('services.wompi.trial_days', 7)),
            ]);

            return $tenant;
        });

        app(BadgeService::class)->ensureStarterBadges($tenant);

        return TenantResource::make($tenant);
    }

    public function show(Tenant $nest)
    {
        $this->authorize('view', $nest);

        return TenantResource::make($nest);
    }

    public function update(StoreTenantRequest $request, Tenant $nest)
    {
        $this->authorize('update', $nest);
        $nest->update($request->safe()->only(['name', 'timezone']));

        return TenantResource::make($nest);
    }

    public function updateFamilyGoal(Request $request, Tenant $nest)
    {
        $user = $request->user();
        abort_unless($user->isSuperAdmin() || ($user->role === 'guide' && $user->belongsToTenant($nest->id)), 403);

        $data = $request->validate(['stars' => ['required', 'integer', 'min:1', 'max:10000']]);

        Setting::updateOrCreate(
            ['tenant_id' => $nest->id, 'key' => 'family_weekly_goal'],
            ['value' => ['stars' => $data['stars']], 'is_public' => true]
        );

        return response()->json(['family_weekly_goal' => $data['stars']]);
    }
}
