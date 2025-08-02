<?php

namespace App\Services\Manager;

use App\Models\{
    City,
    Clinic,
    ClinicImages,
    Doctor,
    RoleUser,
    Secretary,
    Setting,
    Street,
    User,
    WorkingHour,
    ClinicDoctor,
    Clinic_Working_Hour,
    SecretaryWorkingHour,
    ClinicDoctorWorkingHour,
    Role
};
use App\Traits\{HasImageActions, Responses};
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Carbon\Carbon;

class ClinicService
{
    use HasImageActions, Responses;

    /**
     * Bridge method to match Controller call.
     */
    public function createClinic(array $attributes, $user)
    {
        $attributes['user_id'] = $user->id;
        return Clinic::create($attributes);
    }

    /**
     * Create a Stripe Checkout session for clinic creation and payment.
     */
    public function createClinicWithPayment(array $attributes, User $user): array
    {
        $amount = Setting::where('key', 'subscription_price')->value('value') ?? 0;

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $city = City::firstOrCreate(['name' => $attributes['city_name']]);
        $street = Street::firstOrCreate([
            'name'    => $attributes['street_name'],
            'city_id' => $city->id,
        ]);

        $workingHours = $attributes['working_hours'] ?? [];

        $attributes['street_id'] = $street->id;
        unset($attributes['city_name'], $attributes['street_name'], $attributes['working_hours']);

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency'     => 'sar',
                    'product_data' => ['name' => 'Clinic Subscription'],
                    'unit_amount'  => $amount * 100,
                ],
                'quantity' => 1,
            ]],
            'mode'        => 'payment',
            'success_url' => route('clinic.payment.success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url'  => route('payment.cancel'),
            'metadata'    => [
                'user_id'        => $user->id,
                'clinic_data'    => json_encode($attributes),
                'working_hours'  => json_encode($workingHours),
            ],
        ]);

        $user->updateMainRole('manager');

        return ['checkout_url' => $session->url];
    }

    /**
     * Show a single clinic with relations.
     */
    public function showClinic(int $clinicId): ?array
    {
        $clinic = Clinic::with([
            'street.city',
            'workingHours',
            'services:id,name'
        ])->find($clinicId);

        if (!$clinic) return null;

        return $this->transformClinicData($clinic);
    }

    /**
     * Get clinics owned by the authenticated user.
     */
    public function getMyClinics(User $user)
    {
        return Clinic::where('user_id', $user->id)
            ->with('street.city')
            ->get()
            ->map(fn($clinic) => $this->transformClinicData($clinic));
    }

    /**
     * Get all clinics (optionally paginated).
     */
    public function getAllClinics(?User $user = null)
    {
        $query = Clinic::with('street.city');

        if ($user) {
            return $query->get()->map(function ($clinic) {
                return [
                    'id' => $clinic->id,
                    'name' => $clinic->name,
                    'bio' => $clinic->bio,
                    'street' => $clinic->street->name ?? null,
                    'city' => $clinic->street->city->name ?? null,
                ];
            });
        }

        $clinics = $query->paginate(10);

        $clinics->getCollection()->transform(function ($clinic) {
            return [
                'id' => $clinic->id,
                'name' => $clinic->name,
                'bio' => $clinic->bio,
                'street' => $clinic->street->name ?? null,
                'city' => $clinic->street->city->name ?? null,
            ];
        });

        return $clinics;
    }

    /**
     * Get patients associated with user's clinics.
     */
    public function getClinicPatients(User $user)
    {
        $clinicIds = Clinic::where('user_id', $user->id)->pluck('id');

        return User::whereHas('treatments', fn($query) => $query->whereIn('clinic_id', $clinicIds))
            ->with([
                'patientData',
                'treatments' => fn($q) => $q->whereIn('clinic_id', $clinicIds)->with('service')
            ])->get();
    }

    /**
     * Get doctors working in clinics owned by user.
     */
    public function getClinicDoctors(User $user, int $clinicId): ?array
    {
        $clinic = Clinic::where('id', $clinicId)->where('user_id', $user->id)->first();
        if (!$clinic) {
            return null;
        }

        $clinicDoctors = ClinicDoctor::where('clinic_id', $clinicId)
            ->with(['doctor.user', 'doctor', 'workingHours'])
            ->get();

        $transformedDoctors = $clinicDoctors->map(function ($cd) {
            return [
                'user_id' => $cd->doctor->user->id,
                'name' => $cd->doctor->user->name,
                'profile_image' => $cd->doctor->user->profile_image,
                'email' => $cd->doctor->user->email,
                'specialization' => $cd->doctor->specialization,
                'experience_years' => $cd->doctor->experience_years,
                'bio' => $cd->doctor->bio,
                'phone' => $cd->doctor->phone,
                'created_at' => $cd->doctor->created_at ?? null,
                'updated_at' => $cd->doctor->updated_at ?? null,
                'working_hours' => $cd->workingHours->map(function ($wh) {
                    return [
                        'day' => $wh->pivot->working_day,
                        'start' => $wh->start,
                        'end' => $wh->end,
                    ];
                }),
            ];
        });

        return [
            'clinic_name' => $clinic->name,
            'doctors' => $transformedDoctors,
        ];
    }

    /**
     * Get secretaries working in clinics owned by user.
     */
    public function getClinicSecretaries(User $user, int $clinicId): ?array
    {
        $clinic = Clinic::where('id', $clinicId)->where('user_id', $user->id)->first();
        if (!$clinic) {
            return null;
        }

        $secretaries = Secretary::where('clinic_id', $clinicId)
            ->with(['user', 'workingHours'])
            ->get();

        $transformedSecretaries = $secretaries->map(function ($sec) {
            return [
                'user_id' => $sec->user->id,
                'name' => $sec->user->name,
                'profile_image' => $sec->user->profile_image,
                'email' => $sec->user->email,
                'position' => $sec->position ?? null,
                'phone' => $sec->phone ?? null,
                'bio' => $sec->bio ?? null,
                'created_at' => $sec->created_at ?? null,
                'updated_at' => $sec->updated_at ?? null,
                'working_hours' => $sec->workingHours->map(function ($wh) {
                    return [
                        'day' => $wh->pivot->working_day,
                        'start' => $wh->start,
                        'end' => $wh->end,
                    ];
                }),
            ];
        });

        return [
            'clinic_name' => $clinic->name,
            'secretaries' => $transformedSecretaries,
        ];
    }

    public function addStaffToClinic(array $data): ?array
    {
        $user = User::where('email', $data['email_or_phone'])
            ->orWhere('number', $data['email_or_phone'])
            ->first();

        if (!$user) {
            return [
                'error' => true,
                'message' => 'User not found.'
            ];
        }

        $clinic = Clinic::find($data['clinic_id']);
        if (!$clinic) {
            return [
                'error' => true,
                'message' => 'Clinic not found.'
            ];
        }

        $role = Role::where('name', $data['role'])->first();
        if ($role) {
            $user->roles()->syncWithoutDetaching($role->id);
        }

        match ($data['role']) {
            'doctor'    => $this->addDoctor($user, $clinic, $data['working_hours']),
            'secretary' => $this->addSecretary($user, $clinic, $data['working_hours']),
            default     => null
        };

        $clinicWorkingHours = $this->calculateClinicWorkingHours($clinic);

        DB::table('clinic_working_hour')->where('clinic_id', $clinic->id)->delete();

        foreach ($clinicWorkingHours as $day => $periods) {
            foreach ($periods as $range) {
                if (!isset($range['start']) || !isset($range['end'])) {
                    continue;
                }

                $workingHour = WorkingHour::firstOrCreate([
                    'start' => $range['start'],
                    'end'   => $range['end'],
                ]);

                DB::table('clinic_working_hour')->insert([
                    'clinic_id'       => $clinic->id,
                    'working_hour_id' => $workingHour->id,
                    'working_day'     => $day,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ]);
            }
        }

        $user = $user->fresh()->load('roles');

        return [
            'user'                 => $user,
            'assigned_role'        => $data['role'],
            'clinic_working_hours' => $clinicWorkingHours,
        ];
    }

    private function calculateClinicWorkingHours(Clinic $clinic): array
    {
        $doctorHours = DB::table('clinic_doctor_working_hour')
            ->join('clinic_doctor', 'clinic_doctor_working_hour.clinic_doctor_id', '=', 'clinic_doctor.id')
            ->join('working_hours', 'clinic_doctor_working_hour.working_hour_id', '=', 'working_hours.id')
            ->where('clinic_doctor.clinic_id', $clinic->id)
            ->select('clinic_doctor_working_hour.working_day as day', 'working_hours.start', 'working_hours.end')
            ->get();

        $secretaryHours = DB::table('secretary_working_hour')
            ->join('secretaries', 'secretary_working_hour.secretary_id', '=', 'secretaries.id')
            ->join('working_hours', 'secretary_working_hour.working_hour_id', '=', 'working_hours.id')
            ->where('secretaries.clinic_id', $clinic->id)
            ->select('secretary_working_hour.working_day as day', 'working_hours.start', 'working_hours.end')
            ->get();

        $allHours = $doctorHours->merge($secretaryHours);
        $grouped = $allHours->groupBy('day');

        $result = [];

        foreach ($grouped as $day => $hours) {
            $periods = [];
            foreach ($hours as $hour) {
                $start = strtotime($hour->start);
                $end = strtotime($hour->end);
                $periods[] = ['start' => $start, 'end' => $end];
            }

            usort($periods, fn($a, $b) => $a['start'] <=> $b['start']);

            $merged = [];
            foreach ($periods as $period) {
                if (empty($merged)) {
                    $merged[] = $period;
                    continue;
                }

                $last = &$merged[count($merged) - 1];
                if ($period['start'] <= $last['end']) {
                    $last['end'] = max($last['end'], $period['end']);
                } else {
                    $merged[] = $period;
                }
            }

            $result[$day] = array_map(function ($range) {
                return [
                    'start' => date('H:i:s', $range['start']),
                    'end'   => date('H:i:s', $range['end']),
                ];
            }, $merged);
        }

        return $result;
    }

    /**
     * Add image to clinic.
     */
    public function addClinicImage(int $clinicId, UploadedFile $image): ?array
    {
        $clinic = Clinic::findOrFail($clinicId);

        if (auth()->id() !== $clinic->user_id) {
            return null;
        }

        $imageRecord = $this->addImage($clinic, $image, ClinicImages::class, 'clinic_id', 'clinic_images');

        return [
            'images' => [$imageRecord]
        ];
    }

    /**
     * Delete image from clinic.
     */
    public function deleteClinicImage(int $imageId): ?bool
    {
        $image = ClinicImages::findOrFail($imageId);
        $clinic = $image->clinic;

        if (auth()->id() !== $clinic->user_id) return null;

        return $this->deleteImageById($imageId, ClinicImages::class);
    }

    /**
     * Get images for a clinic.
     */
    public function getClinicImages(int $clinicId)
    {
        $clinic = Clinic::findOrFail($clinicId);
        return $this->getImagesFor($clinic, 'clinicImages');
    }

    /**
     * Transform clinic object to array with city/street names.
     */
    private function transformClinicData(Clinic $clinic): array
    {
        $data = $clinic->toArray();
        $data['street_name'] = $clinic->street->name ?? null;
        $data['city_name']   = $clinic->street->city->name ?? null;

        if (isset($clinic->workingHours)) {
            $workingHours = $clinic->workingHours->map(function ($wh) {
                return [
                    'id'    => $wh->id,
                    'start' => date('H:i', strtotime($wh->start)),
                    'end'   => date('H:i', strtotime($wh->end)),
                    'day'   => $wh->pivot->working_day ?? null,
                ];
            })->toArray();

            $data['working_hours'] = $workingHours;

            $grouped = [];
            foreach ($workingHours as $wh) {
                $day = $wh['day'];
                if (!isset($grouped[$day])) {
                    $grouped[$day] = [
                        'start' => $wh['start'],
                        'end'   => $wh['end'],
                    ];
                } else {
                    $grouped[$day]['start'] = min($grouped[$day]['start'], $wh['start']);
                    $grouped[$day]['end']   = max($grouped[$day]['end'], $wh['end']);
                }
            }

            $data['clinic_working_hours'] = $grouped;
        }

        if (isset($clinic->services)) {
            $data['services'] = $clinic->services->map(function ($service) {
                return [
                    'service_id' => $service->id,
                    'name'       => $service->name,
                    'price'      => $service->pivot->price ?? null,
                ];
            })->toArray();
        }

        unset($data['street_id'], $data['street']);
        return $data;
    }

    /**
     * Add doctor and assign working hours.
     */
    private function addDoctor(User $user, Clinic $clinic, array $workingHours): void
    {
        $doctor = Doctor::firstOrCreate(
            ['user_id' => $user->id],
            ['specialization' => 'G', 'experience_years' => 1, 'bio' => 'Auto-generated bio']
        );

        DB::table('clinic_doctor')->updateOrInsert([
            'clinic_id' => $clinic->id,
            'doctor_id' => $doctor->id,
        ]);

        $clinicDoctorId = DB::table('clinic_doctor')
            ->where('clinic_id', $clinic->id)
            ->where('doctor_id', $doctor->id)
            ->value('id');

        foreach ($workingHours as $wh) {
            $workingHour = WorkingHour::firstOrCreate([
                'start' => $wh['start'],
                'end'   => $wh['end'],
            ]);

            DB::table('clinic_doctor_working_hour')->insert([
                'clinic_doctor_id' => $clinicDoctorId,
                'working_hour_id'  => $workingHour->id,
                'working_day'      => $wh['day'],
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);
        }
    }

    /**
     * Add secretary and assign working hours.
     */
    private function addSecretary(User $user, Clinic $clinic, array $workingHours): void
    {
        $secretary = Secretary::firstOrCreate(
            ['user_id' => $user->id, 'clinic_id' => $clinic->id],
            ['bio' => 'Auto-generated bio']
        );

        foreach ($workingHours as $wh) {
            $workingHour = WorkingHour::firstOrCreate([
                'start' => $wh['start'],
                'end'   => $wh['end'],
            ]);

            DB::table('secretary_working_hour')->insert([
                'secretary_id'     => $secretary->id,
                'working_hour_id'  => $workingHour->id,
                'working_day'      => $wh['day'],
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);
        }
    }

    public function updateStaffWorkingHours(array $data): array
    {
        $user = User::find($data['user_id']);
        if (!$user) {
            return ['error' => true, 'message' => 'User not found.'];
        }

        if ($data['role'] !== 'doctor') {
            return ['error' => true, 'message' => 'Only doctor role is supported.'];
        }

        if (!$user->roles()->where('name', 'doctor')->exists()) {
            return ['error' => true, 'message' => 'User does not have doctor role.'];
        }

        $clinicId = $data['clinic_id'];

        $doctor = DB::table('doctors')->where('user_id', $user->id)->first();

        if (!$doctor) {
            $doctorId = DB::table('doctors')->insertGetId([
                'user_id' => $user->id,
                'specialization' => 'G',
                'experience_years' => 1,
                'bio' => 'Auto-generated bio',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $doctor = DB::table('doctors')->where('id', $doctorId)->first();
        }

        $clinicDoctor = DB::table('clinic_doctor')
            ->where('clinic_id', $clinicId)
            ->where('doctor_id', $doctor->id)
            ->first();

        if (!$clinicDoctor) {
            $clinicDoctorId = DB::table('clinic_doctor')->insertGetId([
                'clinic_id' => $clinicId,
                'doctor_id' => $doctor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $clinicDoctor = DB::table('clinic_doctor')->where('id', $clinicDoctorId)->first();
        }

        DB::table('clinic_doctor_working_hour')
            ->where('clinic_doctor_id', $clinicDoctor->id)
            ->delete();

        foreach ($data['working_hours'] as $wh) {
            $workingHour = WorkingHour::firstOrCreate([
                'start' => $wh['start'],
                'end' => $wh['end'],
            ]);

            DB::table('clinic_doctor_working_hour')->insert([
                'clinic_doctor_id' => $clinicDoctor->id,
                'working_hour_id' => $workingHour->id,
                'working_day' => $wh['day'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $clinic = Clinic::find($clinicId);
        $clinicWorkingHours = $this->calculateClinicWorkingHours($clinic);

        DB::table('clinic_working_hour')->where('clinic_id', $clinic->id)->delete();

        foreach ($clinicWorkingHours as $day => $ranges) {
            foreach ($ranges as $range) {
                if (!isset($range['start'], $range['end'])) {
                    continue;
                }

                $workingHour = WorkingHour::firstOrCreate([
                    'start' => $range['start'],
                    'end'   => $range['end'],
                ]);

                DB::table('clinic_working_hour')->insert([
                    'clinic_id'       => $clinic->id,
                    'working_hour_id' => $workingHour->id,
                    'working_day'     => $day,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ]);
            }
        }

        return [
            'success' => true,
            'message' => 'Doctor working hours updated successfully.',
            'user' => $user,
            'clinic_working_hours' => $clinicWorkingHours,
        ];
    }

    public function updateClinic(array $attributes, User $user): array
    {
        $clinic = Clinic::find($attributes['clinic_id']);

        if (!$clinic || $clinic->user_id !== $user->id) {
            return [
                'error' => true,
                'message' => 'Unauthorized access or clinic not found.'
            ];
        }

        if (!empty($attributes['city_name']) && !empty($attributes['street_name'])) {
            $city = City::firstOrCreate(['name' => $attributes['city_name']]);
            $street = Street::firstOrCreate([
                'name' => $attributes['street_name'],
                'city_id' => $city->id
            ]);

            $attributes['street_id'] = $street->id;
        }

        $updateFields = collect($attributes)->only(['name', 'bio', 'phone', 'street_id'])->toArray();

        $clinic->update($updateFields);

        return [
            'success' => true,
            'message' => 'Clinic updated successfully.',
            'clinic' => $this->transformClinicData($clinic->fresh('street.city', 'workingHours'))
        ];
    }
}
