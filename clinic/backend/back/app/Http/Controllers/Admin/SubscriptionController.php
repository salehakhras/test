<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
//Models
use App\Models\Setting;
use App\Models\Clinic;
use App\Models\Advertisment;
//Services
use App\Services\Admin\PaymentService;
//Requests
use App\Http\Requests\Admin\SetPriceRequest;
use App\Http\Requests\Admin\SetDurationRequest;
use App\Traits\Responses;


class SubscriptionController extends Controller
{
    protected $paymentService;
        use Responses;


    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function setSubscriptionPrice(SetPriceRequest $request)
    {
        return $this->paymentService->setSubscriptionPrice($request->price);
    }

    public function setAdvertisementPrice(SetPriceRequest $request)
    {
        return $this->paymentService->setAdvertisementPrice($request->price);
    }

    public function updateSubscriptionPrice(SetPriceRequest $request)
    {
        return $this->paymentService->updateSubscriptionPrice($request->price);
    }

    public function updateAdvertisementPrice(SetPriceRequest $request)
    {
        return $this->paymentService->updateAdvertisementPrice($request->price);
    }

    public function setSubscriptionDuration(SetDurationRequest $request)
    {
        return $this->paymentService->setSubscriptionDuration($request->days);
    }

    public function setAdvertisementDuration(SetDurationRequest $request)
    {
        return $this->paymentService->setAdvertisementDuration($request->days);
    }

    public function checkClinicSubscription(Request $request)
    {
        $clinic = Clinic::find($request->clinic_id);
        if (!$clinic) {
            return response()->json(['message' => 'Clinic not found'], 404);
        }

        if (auth()->user()->hasRole('manager') && $clinic->user_id !== auth()->id()) {
            return response()->json(['message' => 'You are not authorized to view this clinic\'s subscription status.'], 403);
        }

        $isActive = $this->paymentService->isClinicSubscriptionActive($clinic);

        return response()->json([
            'message' => 'Clinic subscription status',
            'data' => ['active' => $isActive],
        ]);
    }

        public function checkAdvertismentSubscription(Request $request)
        {
            $advertisment = Advertisment::with('clinic')->find($request->advertisment_id);

            if (!$advertisment) {
                return response()->json(['message' => 'Advertisment not found'], 404);
            }

            if (!$advertisment->clinic) {
                return response()->json(['message' => 'Advertisment has no associated clinic.'], 400);
            }

            $isActive = $this->paymentService->isAdvertismentSubscriptionActive($advertisment);

            return response()->json([
                'message' => 'Advertisment subscription status',
                'data' => ['active' => $isActive],
            ]);
        }



}
