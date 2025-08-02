<?php

namespace App\Services\Manager;

use Illuminate\Support\Facades\Storage;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Advertisment;
use App\Models\AdvertismentImages;
use App\Models\Setting;
use App\Traits\Responses;
use App\Traits\RoleTrait;
use App\Traits\HasImageActions;
use App\Models\User;
use App\Models\Clinic;

class AdvertismentService
{
    use Responses, RoleTrait, HasImageActions;

public function addAdvertisment($request, $data)
{
    // 🛡️ التحقق من ملكية العيادة
    $clinic = Clinic::find($data['clinic_id']);
    if (!$clinic) {
        return $this->error('Clinic not found', 404);
    }

    if ($request->user()->hasRole('manager') && $clinic->user_id !== $request->user()->id) {
        return $this->error('You are not authorized to add advertisements to this clinic', 403);
    }

    // ⚙️ إعداد السعر من الإعدادات
    $advertisementSetting = Setting::where('key', 'advertisement_price')->first();
    $amount = $advertisementSetting ? $advertisementSetting->value : 0;

    // 💳 إنشاء جلسة Stripe
    Stripe::setApiKey(env('STRIPE_SECRET'));

    $session = Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'sar',
                'product_data' => ['name' => 'Clinic Advertisement Subscription'],
                'unit_amount' => $amount * 100,
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => route('advertisement.payment.success') . '?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => route('payment.cancel'),
        'metadata' => [
            'user_id' => $request->user()->id,
            'clinic_id' => $data['clinic_id'],
            'title' => $data['title'],
            'description' => $data['description'],
        ],
    ]);

    return $this->success('advertisement created successfully', ['checkout_url' => $session->url], 201);
}

    public function getAllAdvertisments(?User $user = null)
    {
        $query = Advertisment::with(['images', 'clinic.street.city']);

        if ($user) {
            return $query->whereHas('clinic', fn($q) => $q->where('user_id', $user->id))
                        ->get()
                        ->map(fn($ad) => $this->transformAdvertismentData($ad));
        }

        $ads = $query->paginate(1);
        $ads->getCollection()->transform(fn($ad) => $this->transformAdvertismentData($ad));

        return $ads;
    }

    public function showAdvertisment(int $id): ?array
    {
        $ad = Advertisment::with(['images', 'clinic.street.city'])->find($id);
        if (!$ad) return null;

        return $this->transformAdvertismentData($ad);
    }

    private function transformAdvertismentData(Advertisment $ad): array
    {
        $data = $ad->toArray();
        $clinic = $ad->clinic;

        $data['clinic_name'] = $clinic->name ?? null;
        $data['street_name'] = $clinic->street->name ?? null;
        $data['city_name']   = $clinic->street->city->name ?? null;

        return $data;
    }


    public function addAdvertismentImage($advertismentId, $image)
    {
        $advertisment = Advertisment::with('clinic')->findOrFail($advertismentId);
        if (auth()->id() !== $advertisment->clinic->user_id) {
            return null;
        }

        return $this->addImage($advertisment, $image, AdvertismentImages::class, 'advertisment_id', 'advertisment_images');
    }

public function deleteAdvertismentImage($imageId)
{
    $image = AdvertismentImages::with('advertisment.clinic')->findOrFail($imageId);

    if (auth()->id() !== $image->advertisment->clinic->user_id) {
        return null;
    }

    return $this->deleteImageById($imageId, AdvertismentImages::class);
}


public function getAdvertismentImages($advertismentId)
{
    $advertisment = Advertisment::with('images')->findOrFail($advertismentId);

    return $advertisment->images->map(fn($image) => [
        'id' => $image->id,
        'path' => $image->path,
        'advertisment_name' => $advertisment->title,
        'created_at' => $image->created_at,
        'updated_at' => $image->updated_at,
    ]);
}

}

