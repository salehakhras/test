<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\Clinic\{
    AddImageRequest,
    DeleteImageRequest,
    GetImageRequest,
    ShowClinicRequest,
    StoreClinicRequest,
    UpdateClinicRequest,
    AddStaffRequest,
    GetClinicStaffRequest,
    UpdateStaffWorkingHoursRequest,
    updateStaffWorkingHours
};
use App\Services\Manager\ClinicService;
use App\Traits\Responses;
use Illuminate\Http\Request;

class ClinicController extends Controller
{
    use Responses;

    protected ClinicService $clinicService;

    public function __construct(ClinicService $clinicService)
    {
        $this->clinicService = $clinicService;
    }

    public function store(StoreClinicRequest $request)
    {
        $data = $this->clinicService->createClinicWithPayment($request->validated(), $request->user());
        return $this->success('Clinic created successfully.', $data, 201);
    }

    public function showClinic(ShowClinicRequest $request)
    {
        $clinicData = $this->clinicService->showClinic($request->validated()['clinic_id']);
        if (!$clinicData) return $this->error('Clinic not found.', [], 404);
        return $this->success('Clinic retrieved successfully.', ['clinic' => $clinicData]);
    }

    public function getClinics(Request $request)
    {
        $clinics = $this->clinicService->getAllClinics($request->user());
        return $this->success('Clinics retrieved successfully.', ['clinics' => $clinics]);
    }

    public function getMyClinics(Request $request)
    {
        $clinics = $this->clinicService->getMyClinics($request->user());
        return $this->success('Clinics retrieved successfully.', ['clinics' => $clinics]);
    }

    public function getClinicPatients(Request $request)
    {
        $patients = $this->clinicService->getClinicPatients($request->user());
        return $this->success('Patients retrieved successfully.', ['patients' => $patients]);
    }

    public function getClinicDoctors(GetClinicStaffRequest $request)
    {
        $clinicId = $request->input('clinic_id');
        $data = $this->clinicService->getClinicDoctors($request->user(), (int)$clinicId);

        if (!$data) {
            return $this->error('Unauthorized access or clinic not found.', [], 403);
        }
        return $this->success('Doctors retrieved successfully.', $data);
    }

    public function getClinicSecretaries(GetClinicStaffRequest $request)
    {
        $clinicId = $request->input('clinic_id');
        $data = $this->clinicService->getClinicSecretaries($request->user(), (int)$clinicId);

        if (!$data) {
            return $this->error('Unauthorized access or clinic not found.', [], 403);
        }
        return $this->success('Secretaries retrieved successfully.', $data);
    }

    public function addStaff(AddStaffRequest $request)
    {
        $data = $this->clinicService->addStaffToClinic($request->validated());

        if (!$data) {
            return $this->error('User or clinic not found.', [], 404);
        }

        if (isset($data['error']) && $data['error'] === true) {
            return $this->error($data['message'], [], 422);
        }

        return $this->success('Staff member successfully added to the clinic.', $data);
    }

    public function addImage(AddImageRequest $request)
    {
        $result = $this->clinicService->addClinicImage($request->clinic_id, $request->file('image'));
        if (!$result) {
            return $this->error('Not authorized or image upload failed.', [], 403);
        }
        return $this->success('Image added successfully.', $result);
    }

    public function deleteImage(DeleteImageRequest $request)
    {
        $result = $this->clinicService->deleteClinicImage($request->image_id);
        if (!$result) return $this->error('Not authorized or image not found.', [], 403);
        return $this->success('Image deleted successfully.', $result);
    }

    public function getImages(GetImageRequest $request)
    {
        $images = $this->clinicService->getClinicImages($request->clinic_id);
        return $this->success('Images retrieved successfully.', ['images' => $images]);
    }

    public function updateStaffWorkingHours(UpdateStaffWorkingHoursRequest $request)
    {
        $result = $this->clinicService->updateStaffWorkingHours($request->validated());

        return response()->json($result);
    }

    public function update(UpdateClinicRequest $request)
    {
        $result = $this->clinicService->updateClinic($request->validated(), $request->user());

        if (isset($result['error']) && $result['error'] === true) {
            return $this->error($result['message'], [], 403);
        }

        return $this->success($result['message'], ['clinic' => $result['clinic']]);
    }

}
