<?php

namespace App\Services;

use App\Models\Advertisment;
use App\Models\Appointment;
use App\Models\Clinic;
use App\Models\Doctor;
use App\Models\ClinicUser;
use App\Models\Service;
use App\Http\Resources\ResponseResource;
use App\Models\ServiceStage;
use App\Models\Stage;
use App\Models\User;
use App\Models\City;
use App\Models\Street;
use App\Models\PatientData;
use App\Models\Treatment;
use App\Traits\Responses;
use Arr;
use Carbon\Carbon;
use Date;
use illuminate\Support\Facades\DB;
/// cancel appointment must be added after meeting with front
class PatientService {

    use Responses;
    public function home(){
        $data['advertisments'] = Advertisment::paginate(10);
        return $this->success('Data sent', $data, 200);
    }

    public function search($attributes, $user_id){
        $keyword = '%' . $attributes['keyword'] . '%';
        $data = Clinic::with(['images'])
            ->where('name','like',$keyword)
            ->leftjoin('clinic_user', function ($join) use ($user_id) {
                $join->on('clinics.id', '=', 'clinic_user.clinic_id')
                    ->where('clinic_user.user_id', '=', $user_id);
            })
            ->select('clinics.*', DB::raw('IF(clinic_user.id IS NOT NULL, 1, 0) as is_favourite'))
            ->paginate(10);

        return $this->success('Clinics sent', $data, 200);
    }

    public function showClinic($attributes, $user_id){
        $data = Clinic::with(['images'])
            ->find($attributes['clinic_id'])
            ->leftJoin('clinic_user', function ($join) use ($user_id) {
                $join->on('clinics.id', '=', 'clinic_user.clinic_id')
                    ->where('clinic_user.user_id', '=', $user_id);
            })
            ->select('clinics.*', DB::raw('IF(clinic_user.id IS NOT NULL, 1, 0) as is_favourite'));
        return $this->success('Clinic sent', $data, 200);
    }

    public function checkAvailableStages($id){
        $active_treatments = Treatment::where('user_id', '=', $id)
            ->where('status', '!=', 'C')
            ->get();
       $services = [];
        foreach($active_treatments as $treatment){
            $service = Service::find($treatment->service_id);
            $service_stage = ServiceStage::where('service_id', '=', $service->id)
                ->where('order', '=', $treatments->stage_number)
                ->get();
            $stage = Stage::find($service_stage->stage_id);
            $service['next_stage'] = $stage;
            $services[] = $service;
        }
        /// to always have the introduction service
        $service = Service::where('name', '=', 'Introduction')->first();
        $service_stage = ServiceStage::where('service_id', '=', $service->id)->first();
        $stage = Stage::find($service_stage->stage_id);
        $service['next_stage'] = $stage;
        $services[] = $service;

        return $this->success('services with stages sent', $services);
    }

    public function checkStageAvailableDates($attributes){

        /// get details needed to check which specialization is needed for the stage

        $clinic = Clinic::with(['clinicDoctors.doctor.appointments','clinicDoctors.workingHours'])
            ->find($attributes['clinic_id']);

        $stage = Stage::find($attributes['stage_id']);
        $specialization = $stage->specialization_needed;
        $clinic->setRelation('clinic_doctors', $clinic->clinicDoctors);
        if($specialization !='G'){
            $filteredDoctors = $clinic->clinicDoctors->filter(function ($clinicDoctor) use ($specialization) {
                $doctor = $clinicDoctor->doctor;
                return $doctor && strtolower($doctor->specialization) === strtolower($specialization);
            })->values();

            // Replace the original relation so Laravel uses the correct key (fixes how data look like)
            $clinic->setRelation('clinic_doctors', $filteredDoctors);
        }

        /// get appointments for every doctor
        foreach ($clinic->clinic_doctors as $clinicDoctor) {
            $doctor = $clinicDoctor->doctor;

            if ($doctor && $doctor->relationLoaded('appointments')) {
                $filteredAppointments = $doctor->appointments
                    ->filter(fn($appt) => $appt->status === 'UC')
                    ->sortBy('time') // 👈 Sort ascending by time
                    ->values();

                $doctor->setRelation('appointments', $filteredAppointments);
            }
        }

        $data = [];


        foreach( $clinic->clinic_doctors as $obj){
            /// get for each doctor his working hours
            foreach( $obj->workingHours as $working_hour){
                $current = Date::now();
                while(True){
                    $day = Carbon::parse($current)->format('l');
                    if($day == $working_hour->pivot->working_day)break;
                    $current->addDay();
                }
                /// this for to get available dates for 2 weeks, 2 can be edited to get more dates
                for($it=0;$it<2;$it++){
                    /// remove booked appointments
                    $current_time = Carbon::createFromTimeString($working_hour->start);
                    foreach($obj->doctor->appointments as $appointment){
                        $appointment_date = Carbon::parse($appointment->date);
                        $appointment_time = Carbon::createFromTimeString($appointment->time);
                        $appointment_duration = Carbon::createFromTimeString($appointment->duration);
                        if(!$appointment_date->isSameDay($current))continue;
                        if($appointment_time->eq($current_time)){
                            $current_time->addHours($appointment_duration->hour)
                                ->addMinutes($appointment_duration->minute)
                                ->addSeconds($appointment_duration->second);
                        }
                    }


                    $stage_duration = Carbon::createFromTimeString($stage->duration);
                    $temp = $current_time->copy()->addHours($stage_duration->hour)
                        ->addMinutes($stage_duration->minute)
                        ->addSeconds($stage_duration->second);
                    $working_hour_end = Carbon::createFromTimeString($working_hour->end);

                    /// check if the appointment will exceed doctor worknig hour
                    if($temp->lt($working_hour_end) || $temp->eq($working_hour_end)){
                        $string_date = Carbon::parse($current)->toDateString();
                        $string_time = $current_time->toTimeString();

                        if(!Arr::has($data,$string_date))$data[$string_date] = [];


                        if(!Arr::has($data[$string_date],$string_time))$data[$string_date][$string_time]=[];

                        $id = $obj->doctor_id;
                        $doc = Doctor::find($id);
                        $data[$string_date][$string_time][] = $doc;

                    }
                    $current->addDays(7);
                }

            }
        }

        return $this->success('',$data,200);
    }

    public function favourites($user_id){
        $user = User::with('favourites')
            ->find($user_id);
        return $this->success('favourite clinics sent', $user->favourites);
    }

    public function updateImage($attributes, $user_id){
        /// delete previous image if exisits then add new one
    }

    public function updateLocation($attributes, $user_id){
        $cities = City::where('name', '=', $attributes['city'])
            ->get();
        if(Arr::isEmpty($cities)){
            $city = City::create(['name' => $attributes['city']]);
        }
        else{
            $city = $cities[0];
        }
        $street = Street::where('name', '=', $attributes['street'])
            ->where('city_id', '-=', $city->id)
            ->get();
        if(Arr::isEmpty($street)){
            $street = Street::create([
                'name' => $attributes['street'],
                'city_id' => $city->id
            ]);
        }
        else{
            $street = $street[0];
        }
        $patient_data = PatientData::firstWhere('user_id', '=', $user_id);
        $patient_data->street_id = $street->id;
        $patient_data->save();
        return $this->success('location updated', $patient_data);
    }

    public function bookAppointment($attributes){
        $appointments = Appointment::where('clinic_id', '=', $attributes['clinic_id'])
            ->where('user_id', '=', $attributes['user_id'])
            ->whereDate('date', '=', $attributes['date'])
            ->orderBy('time', 'asc')
            ->get();
        $time = Carbon::createFromTimeString($attributes['time']);
        $treatment = Treatment::find($attributes['treatment_id']);
        $service_stage = ServiceStage::where('service_id', '=', $treatment->service_id)
            ->where('order', '=', $treatment->stage_number)
            ->first();

        $stage = Stage::find($service_stage->stage_id);
        foreach($appointments as $appt){
            $temp_time = Carbon::createFromTimeString($appt->time);
            if($temp_time->eq($time)){
                return $this->error('appointment time is not available', 401);
            }
            else if($temp_time->lt($time)){
                $duration = Carbon::createFromTimeString($appt->duration);
                $temp_time->addHours($duration->hour);
                $temp_time->addMinutes($duration->minute);
                $temp_time->addSeconds($duration->second);
                if($time->lt($temp_time)){
                    return $this->error('appointment time is not available', 401);
                }
            }
            else {
                $duration = Carbon::createFromTimeString($stage->duration);
                $time->addHours($duration->hour);
                $time->addMinutes($duration->minute);
                $time->addSeconds($duration->second);
                if($temp_time->lt($time)){
                    return $this->error('appointment time is not available', 401);
                }
                break;
            }
        }
        $attributes['status'] = 'UC';
        $attributes['duration'] = $stage->duration;
        $appointment = Appointment::create($attributes);
        return $this->success('appointment booked', $appointment);
    }

    public function addIntroductionTreatment($attributes){
        $service = Service::firstWhere('name', '=', 'Introduction');
        $attributes['service_id'] = $service->id;
        $attributes['stage_number'] = 1;
        $attributes['status'] = 'UC'; /// better check this one in the database
        $treatment = Treatment::create($attributes);
        return $this->success('treatment added',$treatment);
    }

    public function addFavourite($attributes){
        $clinic_user = ClinicUser::where('clinic_id', '-', $attributes['clinic_id'])
            ->where('user_id', '=', $attributes['user_id'])
            ->get();
        if(Arr::isEmpty($clinic_user)){
            ClinicUser::create($attributes);
            return $this->success('clinic added to favourites', []);
        }
        return $this->error('clinic already in favourites',401);
    }
    public function removeFavourite($attributes){
        $clinic_user = ClinicUser::where('clinic_id', '-', $attributes['clinic_id'])
            ->where('user_id', '=', $attributes['user_id'])
            ->get();
        if(Arr::isEmpty($clinic_user)){
            return $this->error('clinic is not in favourites',401);
        }
        $clinic_user[0]->delete();
        return $this->success('clinic removed from favourites', []);
    }
}
