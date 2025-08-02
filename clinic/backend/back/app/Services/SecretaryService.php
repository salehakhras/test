<?php

namespace App\Services;

use App\Traits\Responses;
use App\Models\User;
use App\Models\Treatment;
use App\Models\Service;
use App\Models\ServiceStage;
use App\Models\Stage;
use App\Models\Clinic;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Notifications\MailNotification;
use App\Permissions\Abilities;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Date;
use Arr;
/// cancel appointment must be added after meeting with front

class SecretaryService
{
    use Responses;

    private function returnTokenResponse($request, $user, $token, $message)
    {
        $data = [
            'user' => $user
        ];

        $clientType = $request->header('X-Client-Type');
        if ($clientType === 'web') {
            return $this->success($message, $data, 200)
                ->cookie('token', $token, 60 * 24 * 30, '/', null, false, true, false, 'Strict');
        }
        $data['token'] = $token;
        return $this->success($message, $data, 200);
    }
    public function home()
    {
        //// don't know what should be sent in home page
    }

    public function makeNumberAccount($attributes)
    {
        $attributes['password'] = Hash::make($attributes['password']);
        $otp = (string) rand(100000, 999999);
        $attributes['otp'] = Hash::make($otp);
        $attributes['expire_at'] = now()->addHour();
        $user = User::create($attributes);
        $user->addRoleByName('patient');
        $abilities = Abilities::getAbilities($user);
        $token = $user->createToken('user token for ' . $user->first_name, $abilities)->plainTextToken;
        return $this->returnTokenResponse(request(), $user, $token, 'Account created');
    }

    public function makeEmailAccount($attributes)
    {
        $attributes['password'] = Hash::make($attributes['password']);
        $otp = (string) rand(100000, 999999);
        $attributes['otp'] = Hash::make($otp);
        $attributes['expire_at'] = now()->addHour();
        $user = User::create($attributes);
        $user->addRoleByName('patient');
        $user->notify(new MailNotification($otp));
        $abilities = Abilities::getAbilities($user);
        $token = $user->createToken('user token for ' . $user->first_name, $abilities)->plainTextToken;

        return $this->returnTokenResponse(request(), $user, $token, 'Account created');
    }
    //not completed
    public function verifyAccountByNumber($attributes)
    {
        $user = User::firstWhere('number', '=', $attributes['number']);
        if (now()->greaterThan($user->expire_at)) {
            return $this->error('OTP expired', 1);
        }
        if (!Hash::check($attributes['otp'], $user->otp)) {
            return $this->error('Invalid OTP', 0);
        }
        $user->verified_at = now();
        $user->otp = null;
        $user->save();
        return $this->success('Verified successfully', $user, 200);
    }

    public function verifyAccountByEmail($attributes)
    {
        $user = User::firstWhere('email', '=', $attributes['email']);
        if (now()->greaterThan($user->expire_at)) {
            return $this->error('OTP expired', 1);
        }
        if (!Hash::check($attributes['otp'], $user->otp)) {
            return $this->error('Invalid OTP', 0);
        }
        $user->verified_at = now();
        $user->otp = null;
        $user->save();
        return $this->success('Verified successfully', $user, 200);
    }

    public function addIntroductionTreatmentForPatient($attributes)
    {
        if (is_null($attributes['number']) && is_null($attributes['email'])) {
            return $this->error('number or email required', 401);
        }
        if (!is_null($attributes['number'])) {
            $patient = User::firstWhere('number', '=', $attributes['number']);
        } else {
            $patient = User::firstWhere('email', '=', $attributes['email']);
        }

        $service = Service::firstWhere('name', '=', 'Introduction');
        $attr['service_id'] = $service->id;
        $attr['stage_number'] = 1;
        $attr['status'] = 'UC'; /// better check this one in the database
        $attr['user_id'] = $patient->id;
        $attr['clinic_id'] = $attributes['user']->clinic_id;
        $treatment = Treatment::create($attr);
        return $this->success('treatment added', $treatment);
    }

    public function bookAppointmentForPatient($attributes)
    {
        if (is_null($attributes['number']) && is_null($attributes['email'])) {
            return $this->error('number or email required', 401);
        }
        if (!is_null($attributes['number'])) {
            $patient = User::firstWhere('number', '=', $attributes['number']);
        } else {
            $patient = User::firstWhere('email', '=', $attributes['email']);
        }
        $attributes['user_id'] = $patient->id;
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
        foreach ($appointments as $appt) {
            $temp_time = Carbon::createFromTimeString($appt->time);
            if ($temp_time->eq($time)) {
                return $this->error('appointment time is not available', 401);
            } else if ($temp_time->lt($time)) {
                $duration = Carbon::createFromTimeString($appt->duration);
                $temp_time->addHours($duration->hour);
                $temp_time->addMinutes($duration->minute);
                $temp_time->addSeconds($duration->second);
                if ($time->lt($temp_time)) {
                    return $this->error('appointment time is not available', 401);
                }
            } else {
                $duration = Carbon::createFromTimeString($stage->duration);
                $time->addHours($duration->hour);
                $time->addMinutes($duration->minute);
                $time->addSeconds($duration->second);
                if ($temp_time->lt($time)) {
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

    public function cancelAppointment()
    {

    }

    public function getAvailableStagesForPatient($attributes)
    {
        if (is_null($attributes['number']) && is_null($attributes['email'])) {
            return $this->error('number or email required', 401);
        }
        if (!is_null($attributes['number'])) {
            $patient = User::firstWhere('number', '=', $attributes['number']);
        } else {
            $patient = User::firstWhere('email', '=', $attributes['email']);
        }
        $active_treatments = Treatment::where('user_id', '=', $patient->id)
            ->where('status', '!=', 'C')
            ->get();
        $services = [];
        foreach ($active_treatments as $treatment) {
            $service = Service::find($treatment->service_id);
            $service_stage = ServiceStage::where('service_id', '=', $service->id)
                ->where('order', '=', $treatments->stage_number)
                ->get();
            $stage = Stage::find($service_stage->stage_id);
            $service['next_stage'] = $stage;
            $services[] = $service;
        }
        $service = Service::where('name', '=', 'Introduction')->first();
        $service_stage = ServiceStage::where('service_id', '=', $service->id)->first();
        $stage = Stage::find($service_stage->stage_id);
        $service['next_stage'] = $stage;
        $services[] = $service;
        return $this->success('services with stages sent', $services);
    }

    public function getStageAvailableDates($attributes)
    {
        /// get details needed to check which specialization is needed for the stage
        $clinic = Clinic::with(['clinicDoctors.doctor.appointments', 'clinicDoctors.workingHours'])
            ->find($attributes['clinic_id']);

        $stage = Stage::find($attributes['stage_id']);
        $specialization = $stage->specialization_needed;
        $clinic->setRelation('clinic_doctors', $clinic->clinicDoctors);
        if ($specialization != 'G') {
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


        foreach ($clinic->clinic_doctors as $obj) {
            /// get for each doctor his working hours
            foreach ($obj->workingHours as $working_hour) {
                $current = Date::now();
                while (True) {
                    $day = Carbon::parse($current)->format('l');
                    if ($day == $working_hour->pivot->working_day)
                        break;
                    $current->addDay();
                }
                /// this for to get available dates for 2 weeks, 2 can be edited to get more dates
                for ($it = 0; $it < 2; $it++) {
                    /// remove booked appointments
                    $current_time = Carbon::createFromTimeString($working_hour->start);
                    foreach ($obj->doctor->appointments as $appointment) {
                        $appointment_date = Carbon::parse($appointment->date);
                        $appointment_time = Carbon::createFromTimeString($appointment->time);
                        $appointment_duration = Carbon::createFromTimeString($appointment->duration);
                        if (!$appointment_date->isSameDay($current))
                            continue;
                        if ($appointment_time->eq($current_time)) {
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
                    if ($temp->lt($working_hour_end) || $temp->eq($working_hour_end)) {
                        $string_date = Carbon::parse($current)->toDateString();
                        $string_time = $current_time->toTimeString();

                        if (!Arr::has($data, $string_date))
                            $data[$string_date] = [];


                        if (!Arr::has($data[$string_date], $string_time))
                            $data[$string_date][$string_time] = [];

                        $id = $obj->doctor_id;
                        $doc = Doctor::find($id);
                        $data[$string_date][$string_time][] = $doc;

                    }
                    $current->addDays(7);
                }

            }
        }

        return $this->success('', $data, 200);
    }
}
