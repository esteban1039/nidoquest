<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\TenantResource;
use App\Models\GrowthArea;
use App\Models\Subscription;
use App\Models\Tenant;
use App\Models\User;
use App\Services\TenantContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $result = DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'role' => User::ROLE_GUIDE,
                'locale' => $data['locale'] ?? 'es-LATAM',
            ]);

            $tenant = Tenant::create([
                'name' => $data['tenant_name'],
                'slug' => Str::slug($data['tenant_name']).'-'.Str::lower(Str::random(5)),
                'status' => 'trial',
                'owner_id' => $user->id,
            ]);

            $tenant->users()->attach($user->id, ['role' => User::ROLE_GUIDE]);

            foreach ([
                ['name' => 'Estudio', 'color' => '#79C7C5'],
                ['name' => 'Hogar', 'color' => '#F7C948'],
                ['name' => 'Bienestar', 'color' => '#F59B8F'],
                ['name' => 'Lectura', 'color' => '#8BB9F1'],
            ] as $area) {
                GrowthArea::create([
                    'tenant_id' => $tenant->id,
                    'name' => $area['name'],
                    'slug' => Str::slug($area['name']),
                    'color' => $area['color'],
                    'active' => true,
                ]);
            }

            Subscription::create([
                'tenant_id' => $tenant->id,
                'plan' => 'annual',
                'status' => 'trial',
                'price_cents' => (int) env('WOMPI_ANNUAL_PRICE_COP', 15000000),
                'currency' => 'COP',
                'trial_ends_at' => now()->addDays(14),
            ]);

            return compact('user', 'tenant');
        });

        return response()->json([
            'user' => $result['user'],
            'tenant' => TenantResource::make($result['tenant']),
            'token' => $result['user']->createToken('nidoquest')->plainTextToken,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciales no válidas.'], 422);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $user->forceFill(['last_login_at' => now()])->save();

        return response()->json([
            'user' => $user,
            'tenants' => TenantResource::collection($user->tenants),
            'token' => $user->createToken($request->input('device_name', 'nidoquest'))->plainTextToken,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Sesión cerrada.']);
    }

    public function me(Request $request, TenantContext $tenantContext): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
            'tenant' => $tenantContext->get() ? TenantResource::make($tenantContext->get()) : null,
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:10', 'confirmed'],
        ]);

        if (! Hash::check($data['current_password'], $request->user()->password)) {
            return response()->json(['message' => 'La contrasena actual no es correcta.'], 422);
        }

        $request->user()->forceFill([
            'password' => $data['password'],
            'must_change_password' => false,
        ])->save();

        return response()->json(['message' => 'Contrasena actualizada.']);
    }
}
