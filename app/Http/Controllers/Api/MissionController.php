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
use Carbon\CarbonInterface;
use Illuminate\Support\Arr;

class MissionController extends Controller
{
    public function index(TenantContext $tenantContext)
    {
        return MissionResource::collection(Mission::forTenant($tenantContext->id())->with(['explorer', 'growthArea', 'schedule'])->latest()->paginate());
    }

    public function store(StoreMissionRequest $request, TenantContext $tenantContext)
    {
        $data = $request->validated();
        $schedule = Arr::only($data, ['starts_at', 'ends_at']);
        $missionData = Arr::except($data, ['starts_at', 'ends_at']);

        $mission = Mission::create($missionData + [
            'tenant_id' => $tenantContext->id(),
            'status' => 'pending',
        ]);

        $this->syncSchedule($mission, $schedule);

        return MissionResource::make($mission->load('schedule'));
    }

    public function show(Mission $mission)
    {
        $this->authorize('view', $mission);

        return MissionResource::make($mission);
    }

    public function update(StoreMissionRequest $request, Mission $mission)
    {
        $this->authorize('manage', $mission);
        $data = $request->validated();
        $schedule = Arr::only($data, ['starts_at', 'ends_at']);

        $mission->update(Arr::except($data, ['starts_at', 'ends_at']));
        $this->syncSchedule($mission, $schedule);

        return MissionResource::make($mission->load('schedule'));
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
        abort_unless(in_array($mission->status, ['pending', 'rejected'], true), 422, 'La mision no esta disponible para enviar.');

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
        abort_unless($mission->status === 'submitted', 422, 'La mision debe estar enviada para aprobarla.');

        $movement = $stars->earn($mission->explorer, $mission, request()->user());

        $mission->submissions()->latest()->first()?->update([
            'status' => 'approved',
            'reviewed_by' => request()->user()->id,
            'reviewed_at' => now(),
        ]);

        $mission->loadMissing('schedule');
        $mission->update($this->approvalState($mission));

        return response()->json(['mission' => MissionResource::make($mission), 'star_movement' => $movement]);
    }

    public function reject(Mission $mission)
    {
        $this->authorize('manage', $mission);
        abort_unless($mission->status === 'submitted', 422, 'La mision debe estar enviada para rechazarla.');

        $mission->update(['status' => 'rejected']);
        $mission->submissions()->latest()->first()?->update([
            'status' => 'rejected',
            'reviewed_by' => request()->user()->id,
            'reviewed_at' => now(),
            'guide_feedback' => request('guide_feedback', 'Gracias por intentarlo. Pueden ajustar el plan y volver a intentarlo.'),
        ]);

        return MissionResource::make($mission);
    }

    private function syncSchedule(Mission $mission, array $schedule): void
    {
        $startsAt = $schedule['starts_at'] ?? $mission->due_date?->toDateString();
        $endsAt = $schedule['ends_at'] ?? null;

        if ($mission->frequency === 'once' && ! $startsAt && ! $endsAt) {
            $mission->schedule()->delete();

            return;
        }

        $mission->schedule()->updateOrCreate(
            [],
            [
                'tenant_id' => $mission->tenant_id,
                'starts_at' => $startsAt,
                'ends_at' => $endsAt,
                'custom_rule' => ['frequency' => $mission->frequency],
            ],
        );
    }

    private function approvalState(Mission $mission): array
    {
        if ($mission->frequency === 'once') {
            return ['status' => 'approved'];
        }

        $nextDate = $this->nextDueDate($mission);
        $endsAt = $mission->schedule?->ends_at;

        if ($endsAt && $nextDate->greaterThan($endsAt)) {
            return ['status' => 'approved'];
        }

        return [
            'status' => 'pending',
            'due_date' => $nextDate,
        ];
    }

    private function nextDueDate(Mission $mission): CarbonInterface
    {
        $base = $mission->due_date?->copy() ?? now();

        return match ($mission->frequency) {
            'weekly' => $base->addWeek(),
            'monthly' => $base->addMonthNoOverflow(),
            default => $base->addDay(),
        };
    }
}
