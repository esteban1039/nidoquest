<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GrowthArea;
use App\Services\TenantContext;

class GrowthAreaController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        return response()->json([
            'data' => GrowthArea::forTenant($tenantContext->id())
                ->where('active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'color']),
        ]);
    }
}
