<?php

namespace App\Services\Admin;
//Models
use App\Models\Setting;
use App\Models\Clinic;
use App\Models\Advertisment;

use App\Traits\Responses;

class PaymentService {

    use Responses;
    public function setSubscriptionPrice($price)
    {
        $setting = Setting::updateOrCreate(
            ['key' => 'subscription_price'],
            ['value' => $price]
        );
        return $this->success('Subscription price set successfully',$setting);
    }

    public function setAdvertisementPrice($price)
    {
        $setting = Setting::updateOrCreate(
            ['key' => 'advertisement_price'],
            ['value' => $price]
        );
        return $this->success('Advertisement price set successfully', $setting);
    }

    public function updateSubscriptionPrice($price)
    {
        $setting = Setting::where('key', 'subscription_price')->first();
        if (!$setting) {
            return $this->error('Subscription price not set',404);
        }
        $setting->value = $price;
        $setting->save();
        return $this->success('Subscription price updated successfully',$setting);
    }

    public function updateAdvertisementPrice($price)
    {
        $setting = Setting::where('key', 'advertisement_price')->first();
        if (!$setting) {
            return $this->error('Advertisement price not set', 404);
        }
        $setting->value = $price;
        $setting->save();
        return $this->success('Advertisement price updated successfully', $setting);
    }

    public function isClinicSubscriptionActive(Clinic $clinic): bool
    {
        if (auth()->user()->hasRole('manager') && $clinic->user_id !== auth()->id()) {
            return false;
        }

        $duration = Setting::where('key', 'subscription_duration_days')->value('value') ?? 30;
        if (!$clinic->subscribed_at) return false;

        return now()->diffInDays($clinic->subscribed_at) < $duration;
    }

    public function isAdvertismentSubscriptionActive(Advertisment $advertisment): bool
    {
        if (auth()->user()->hasRole('manager') && $advertisment->clinic->user_id !== auth()->id()) {
            return false;
        }

        $duration = Setting::where('key', 'advertisment_duration_days')->value('value') ?? 15;

        if (!$advertisment->subscribed_at) return false;

        return now()->diffInDays($advertisment->subscribed_at) < $duration;
    }

    public function setSubscriptionDuration($days)
    {
        $setting = Setting::updateOrCreate(
            ['key' => 'subscription_duration_days'],
            ['value' => $days]
        );
        return $this->success('Subscription duration set', $setting);
    }

    public function setAdvertisementDuration($days)
    {
        $setting = Setting::updateOrCreate(
            ['key' => 'advertisement_duration_days'],
            ['value' => $days]
        );
        return $this->success('Advertisement duration set', $setting);
    }

}
