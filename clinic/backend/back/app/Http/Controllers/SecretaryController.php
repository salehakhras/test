<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddIntroductionTreatmentForPatientRequest;
use App\Http\Requests\Secretary\BookAppointmentForPatientRequest;
use App\Http\Requests\Secretary\GetAvailableStagesForPatientRequest;
use App\Http\Requests\Secretary\GetStageAvailableDatesRequest;
use App\Http\Requests\Secretary\MakeEmailAccountRequest;
use App\Http\Requests\Secretary\MakeNumberAccountRequest;
use App\Http\Requests\Secretary\VerifyAccountByEmailRequest;
use App\Http\Requests\Secretary\VerifyAccountByNumberRequest;
use App\Services\SecretaryService;
use Illuminate\Http\Request;
class SecretaryController extends Controller
{
    protected $service;

    public function __construct(SecretaryService $service){
        $this->service = $service;
    }
    public function home()
    {
        //// don't know what should be sent in home page
    }

    public function makeNumberAccount(MakeNumberAccountRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->service->makeNumberAccount($attributes);
    }

    public function makeEmailAccount(MakeEmailAccountRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->service->makeEmailAccount($attributes);
    }
    public function verifyAccountByNumber(VerifyAccountByNumberRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->service->verifyAccountByNumber($attributes);
    }

    public function verifyAccountByEmail(VerifyAccountByEmailRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->service->verifyAccountByEmail($attributes);
    }

    public function addIntroductionTreatmentForPatient(AddIntroductionTreatmentForPatientRequest $request)
    {
        $attributes = $request->validate($request->rules());
        $attributes['user'] = $request->user();
        return $this->service->addIntroductionTreatmentForPatient($attributes);
    }

    public function bookAppointmentForPatient(BookAppointmentForPatientRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->service->bookAppointmentForPatient($attributes);
    }

    public function cancelAppointment()
    {
        /// after meeting
    }

    public function getAvailableStagesForPatient(GetAvailableStagesForPatientRequest $request)
    {
        $attributes = $request->validate($request->rules());
        return $this->service->getAvailableStagesForPatient($attributes);
    }

    public function getStageAvailableDates(GetStageAvailableDatesRequest $request)
    {
        /// get details needed to check which specialization is needed for the stage
        $attributes = $request->validate($request->rules());
        return $this->service->getStageAvailableDates($attributes);
    }
}
