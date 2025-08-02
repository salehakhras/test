<?php

namespace App\Http\Controllers;

use App\Http\Requests\Patient\AddFavouriteRequest;
use App\Http\Requests\Patient\AddIntroductionTreatmentRequest;
use App\Http\Requests\Patient\BookAppointmentRequest;
use App\Http\Requests\Patient\CheckStageAvailableDatesRequest;
use App\Http\Requests\Patient\RemoveFavouriteRequest;
use App\Http\Requests\Patient\SearchRequest;
use App\Http\Requests\Patient\ShowClinicRequest;
use App\Http\Requests\Patient\UpdateImageRequest;
use App\Http\Requests\Patient\UpdateLocationRequest;
use App\Services\PatientService;
use Illuminate\Http\Request;

/// must add security actions, to avoid booking many appointments, also cancelling a appointment
class PatientController extends Controller
{
    protected $service;

    public function __construct(PatientService $service){
        $this->service = $service;
    }

    public function home(Request $request){
        return $this->service->home();
    }
    
    public function search(SearchRequest $request){
        $attributes = $request->validate($request->rules());
        return $this->service->search($attributes, $request->user()->id);
    }

    public function showClinic(ShowClinicRequest $request){
        $attributes = $request->validate($request->rules());
        return $this->service->showClinic($attributes, $request->user()->id);
    }
    public function checkAvailableStages(Request $request){
        return $this->service->checkAvailableStages($request->user()->id);
    }

    public function checkStageAvailableDates(CheckStageAvailableDatesRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['user']['id']=$request->user()->id;
        return $this->service->checkStageAvailableDates($attributes);
    }

    public function updateImage(UpdateImageRequest $request){
        /// service should be completed
        $attributes = $request->validate($request->rules());
        return $this->service->updateImage($attributes, $request->user()->id);
    }

    public function updateLocation(UpdateLocationRequest $request){
        $attributes = $request->validate($request->rules());
        return $this->service->updateLocation($attributes, $request->user()->id);
    }

    public function bookAppointment(BookAppointmentRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['user_id'] = $request->user()->id;
        return $this->service->bookAppointment($attributes);
    }

    public function addIntroductionTreatment(AddIntroductionTreatmentRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['user_id'] = $request->user()->id;
        return $this->service->addIntroductionTreatment($attributes);
    }

    public function addFavourite(AddFavouriteRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['user_id'] = $request->user()->id;
        return $this->service->addFavourite($attributes);
    }

    public function removeFavourite(RemoveFavouriteRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['user_id'] = $request->user()->id;
        return $this->service->removeFavourite($attributes);
    }
}
