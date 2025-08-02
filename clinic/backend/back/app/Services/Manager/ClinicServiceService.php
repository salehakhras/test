<?php

namespace App\Services\Manager;
//Models
use App\Models\Service;
use App\Models\Clinic;
use App\Models\Stage;
//Traits
use App\Traits\Responses;

class ClinicServiceService {
        use Responses;


    public function findServiceByName($name)
    {
        return Service::where('name', $name)->first();
    }

    public function addServiceToClinic($clinicId, $serviceData, $price)
    {
        $clinic = Clinic::findOrFail($clinicId);

        $currentUser = auth()->user();

        if ($clinic->user_id !== $currentUser->id) {
            abort(403, 'You are not authorized to add services to this clinic.');
        }
        $service = null;

        if (isset($serviceData['service_id'])) {
            $service = Service::findOrFail($serviceData['service_id']);
        } else {
            $service = Service::create([
                'name' => $serviceData['name'],
                'description' => $serviceData['description'] ?? null,
                'duration' => $serviceData['duration'] ?? null,
                'stages_number' => isset($serviceData['stages']) ? count($serviceData['stages']) : ($serviceData['stages_number'] ?? 0),
            ]);

            if (!empty($serviceData['stages']) && is_array($serviceData['stages'])) {
                foreach ($serviceData['stages'] as $index => $stageData) {
                    $stage = Stage::create([
                        'duration' => $stageData['duration'],
                        'title' => $stageData['title'],
                        'specialization_id' => $stageData['specialization_id'],
                        'description' => $stageData['description'],
                    ]);

                    $service->stages()->attach($stage->id, ['order' => $index + 1]);
                }
            }
        }

        if ($clinic->services()->where('service_id', $service->id)->exists()) {
            return $this->success('Service already linked to clinic', ['service' => $service]);
        }

        $clinic->services()->attach($service->id, ['price' => $price]);

        return $this->success('Service linked to clinic successfully', ['service' => $service]);
    }

    public function removeServiceFromClinic($clinicId, $serviceId)
    {
        $clinic = Clinic::findOrFail($clinicId);
        $service = Service::findOrFail($serviceId);

        $currentUser = auth()->user();

        if ($clinic->user_id !== $currentUser->id) {
            abort(403, 'You are not authorized to remove services from this clinic.');
        }

        if (!$clinic->services()->where('service_id', $serviceId)->exists()) {
            return response()->json(['message' => 'This service is not found in this clinic'], 404);
        }

        $clinic->services()->detach($serviceId);

        return $this->success('Service removed successfully', ['service' => $service]);
    }

    public function showClinicServices($clinicId)
    {
        $clinic = Clinic::findOrFail($clinicId);

        $services = $clinic->services()
            ->with([
                'stages',
                'clinics' => function ($query) {
                    $query->select('clinics.id', 'clinics.name');
                }
            ])
            ->withPivot('price')
            ->get();

        return response()->json(['services' => $services], 200);
    }

    public function getStages(int $serviceId)
    {
        $service = Service::with(['stages'])->findOrFail($serviceId);

        $stages = $service->stages->map(function ($stage) {
            return [
                'id'                    => $stage->id,
                'title'                 => $stage->title,
                'duration'              => $stage->duration,
                'description'           => $stage->description,
                'specialization'  => [
                        'id'   => $stage->specialization->id,
                        'name' => $stage->specialization->name,
                    ],
                'order'                 => $stage->pivot->order,
            ];
        })->sortBy('order')->values()->all();

        return response()->json(['stages' => $stages], 200);
    }

}
