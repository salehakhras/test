<?php

namespace App\Http\Controllers\Manager;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//Pay
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Checkout\Session as StripeSession;
//Traits
use App\Traits\Responses;
use App\Traits\RoleTrait;

use App\Models\User;
use App\Services\Manager\ClinicService;
use Illuminate\Support\Facades\DB;
use App\Models\WorkingHour;

use App\Models\Advertisment;

class PaymentController extends Controller
{
    use RoleTrait;
    use Responses;
    protected $clinicService;

    public function __construct(ClinicService $clinicService)
    {
        $this->clinicService = $clinicService;
    }

public function paymentClinicSuccess(Request $request)
{
    Stripe::setApiKey(env('STRIPE_SECRET'));
    $session = StripeSession::retrieve($request->get('session_id'));
    $user = User::find($session->metadata->user_id);
    $clinicData = json_decode($session->metadata->clinic_data, true);
    $workingHours = json_decode($session->metadata->working_hours, true);

    DB::beginTransaction();
    try {
        $clinic = $this->clinicService->createClinic($clinicData, $user);

        $clinic->update(['subscribed_at' => now()]);

        $user->updateMainRole('manager');

        foreach ($workingHours as $wh) {
            $workingHour = WorkingHour::firstOrCreate([
                'start' => $wh['start'],
                'end'   => $wh['end'],
            ]);

            DB::table('clinic_working_hour')->insert([
                'clinic_id'        => $clinic->id,
                'working_hour_id'  => $workingHour->id,
                'working_day'      => $wh['day'],
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);
        }

        DB::commit();
    } catch (\Exception $e) {
        DB::rollBack();
        \Log::error('Error during clinic subscription success: ' . $e->getMessage());
        return $this->error('Payment processing failed.', 500);
    }

    return redirect('http://dentalhub.org:8080/dashboard');
}


public function paymentAdvertisementSuccess(Request $request)
{
    Stripe::setApiKey(env('STRIPE_SECRET'));
    $session = Session::retrieve($request->get('session_id'));

    DB::beginTransaction();
    try {
        $advertisement = Advertisment::create([
            'clinic_id'   => $session->metadata->clinic_id,
            'title'       => $session->metadata->title,
            'description' => $session->metadata->description,
        ]);

        $advertisement->update(['subscribed_at' => now()]);

        DB::commit();
    } catch (\Exception $e) {
        DB::rollBack();
        \Log::error('Error during advertisement subscription success: ' . $e->getMessage());
        return $this->error('Advertisement payment failed.', 500);
    }

    return redirect('http://dentalhub.org:8080/dashboard');
}

}
