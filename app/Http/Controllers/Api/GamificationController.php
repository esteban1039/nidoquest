<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Explorer;
use App\Services\GamificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GamificationController extends Controller
{
    public function __construct(
        protected GamificationService $gamification
    ) {}

    /**
     * Get gamification profile (streaks, daily spin) for an explorer.
     */
    public function profile(Explorer $explorer): JsonResponse
    {
        $this->authorize('view', $explorer);

        return response()->json([
            'data' => $this->gamification->getProfile($explorer),
        ]);
    }

    /**
     * Execute the daily spin for an explorer.
     */
    public function spin(Request $request, Explorer $explorer): JsonResponse
    {
        $this->authorize('view', $explorer);

        $result = $this->gamification->spin($explorer, $request->user());

        return response()->json($result);
    }
}
