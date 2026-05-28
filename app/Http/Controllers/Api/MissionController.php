<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Mission\StoreMissionRequest;
use App\Http\Requests\Mission\SubmitMissionRequest;
use App\Http\Resources\MissionResource;
use App\Models\Mission;
use App\Models\MissionSubmission;
use App\Services\StarService;
use App\Services\TenantContext;

class MissionController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        return MissionResource::collection(Mission::forTenant($tenantContext->id())->with(['explorer', 'growthArea'])->latest()->paginate());
    }

    public function store(StoreMissionRequest $request, TenantContext $tenantContext)
    {
        $mission = Mission::create($request->validated() + [
            'tenant_id' => $tenantContext->id(),
            'status' => 'pending',
        ]);

        return MissionResource::make($mission);
    }

    public function show(Mission $mission)
    {
        $this->authorize('view', $mission);

        return MissionResource::make($mission);
    }

    public function update(StoreMissionRequest $request, Mission $mission)
    {
        $this->authorize('manage', $mission);
        $mission->update($request->validated());

        return MissionResource::make($mission);
    }

    public function destroy(Mission $mission)
    {
        $this->authorize('manage', $mission);
        $mission->delete();

        return response()->noContent();
    }

    public function submit(SubmitMissionRequest $request, Mission $mission)
    {
        $this->authorize('view', $mission);

        $submission = MissionSubmission::create($request->validated() + [
            'tenant_id' => $mission->tenant_id,
            'mission_id' => $mission->id,
            'explorer_id' => $mission->explorer_id,
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);

        $mission->update(['status' => 'submitted']);

        return response()->json(['data' => $submission], 201);
    }

    public function approve(Mission $mission, StarService $stars)
    {
        $this->authorize('manage', $mission);

        $mission->update(['status' => 'approved']);
        $movement = $stars->earn($mission->explorer, $mission, request()->user());

        $mission->submissions()->latest()->first()?->update([
            'status' => 'approved',
            'reviewed_by' => request()->user()->id,
            'reviewed_at' => now(),
        ]);

        return response()->json(['mission' => MissionResource::make($mission), 'star_movement' => $movement]);
    }

    public function reject(Mission $mission)
    {
        $this->authorize('manage', $mission);

        $mission->update(['status' => 'rejected']);
        $mission->submissions()->latest()->first()?->update([
            'status' => 'rejected',
            'reviewed_by' => request()->user()->id,
            'reviewed_at' => now(),
            'guide_feedback' => request('guide_feedback', 'Gracias por intentarlo. Pueden ajustar el plan y volver a intentarlo.'),
        ]);

        return MissionResource::make($mission);
    }
}
