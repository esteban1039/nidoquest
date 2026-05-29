<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class GuideController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        $guides = User::query()
            ->where('role', User::ROLE_GUIDE)
            ->whereHas('tenants', fn ($query) => $query->whereKey($tenantContext->id()))
            ->latest()
            ->get(['id', 'name', 'email', 'last_login_at']);

        return response()->json(['data' => $guides]);
    }

    public function store(Request $request, TenantContext $tenantContext)
    {
        abort_unless(in_array($request->user()?->role, [User::ROLE_SUPER_ADMIN, User::ROLE_GUIDE], true), 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $guide = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => User::ROLE_GUIDE,
            'locale' => $request->user()->locale,
            'active' => true,
        ]);

        $guide->tenants()->attach($tenantContext->id(), ['role' => User::ROLE_GUIDE]);

        return response()->json(['data' => $guide->only(['id', 'name', 'email', 'last_login_at'])], 201);
    }
}
