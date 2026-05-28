<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Star\AdjustStarsRequest;
use App\Models\Explorer;
use App\Services\StarService;

class StarController extends Controller
{
    public function balance(Explorer $explorer, StarService $stars)
    {
        $this->authorize('view', $explorer);

        return response()->json(['explorer_id' => $explorer->id, 'available_stars' => $stars->balance($explorer)]);
    }

    public function movements(Explorer $explorer)
    {
        $this->authorize('view', $explorer);

        return response()->json(['data' => $explorer->starMovements()->latest()->paginate()]);
    }

    public function adjust(AdjustStarsRequest $request, Explorer $explorer, StarService $stars)
    {
        $this->authorize('manage', $explorer);

        $movement = $stars->adjust(
            $explorer,
            $request->validated('type'),
            (int) $request->validated('amount'),
            $request->validated('reason') ?? '',
            $request->user()
        );

        return response()->json(['data' => $movement], 201);
    }
}
