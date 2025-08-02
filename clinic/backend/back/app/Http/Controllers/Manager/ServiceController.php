<?php
//service and stage controller

namespace App\Http\Controllers\Manager;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
//Models
use App\Models\Service;
//Requests
use App\Http\Requests\Manager\Service\AddServiceRequest;
use App\Http\Requests\Manager\Service\ShowClinicServicesRequest;
use App\Http\Requests\Manager\Service\RemoveServiceFromClinicRequest;
use App\Http\Requests\Manager\Service\GetServiceStagesRequest;
//Services
use App\Services\Manager\ClinicServiceService;

class ServiceController extends Controller
{
    protected $ClinicServiceService;

    public function __construct(ClinicServiceService $ClinicServiceService)
    {
        $this->ClinicServiceService = $ClinicServiceService;
    }

    public function addServiceToClinic(AddServiceRequest $request)
    {
        $attributes = $request->validated();
        return $this->ClinicServiceService->addServiceToClinic(
            $attributes['clinic_id'], $attributes, $attributes['price'] );
    }

    public function getServices()
    {
        $services = Service::select('id', 'name', 'description')->get();
        return response()->json(['services' => $services], 200);
    }

    public function showClinicServices(ShowClinicServicesRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->ClinicServiceService->showClinicServices($attributes['clinic_id']);
    }

    public function removeServiceFromClinic(RemoveServiceFromClinicRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->ClinicServiceService->removeServiceFromClinic(
            $attributes['clinic_id'], $attributes['service_id']);
    }

    public function getStages(GetServiceStagesRequest $request)
    {
        $attributes = $request->validated();
        return $this->ClinicServiceService->getStages($attributes['service_id']);
    }

}
