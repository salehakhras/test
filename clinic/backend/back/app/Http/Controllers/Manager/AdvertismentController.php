<?php

namespace App\Http\Controllers\Manager;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\Advertisment\AddAdvertismentRequest;
use App\Http\Requests\Manager\Advertisment\AddAdvertismentImagesRequest;
use App\Http\Requests\Manager\Advertisment\ShowAdvertismentRequest;
use App\Http\Requests\Manager\Advertisment\GetAdvertismentImagesRequest;
use App\Http\Requests\Manager\Advertisment\DeleteAdvertismentImageRequest;
use App\Services\Manager\AdvertismentService;

class AdvertismentController extends Controller
{
    protected $advertismentService;

    public function __construct(AdvertismentService $advertismentService)
    {
        $this->advertismentService = $advertismentService;
    }

    public function addAdvertisment(AddAdvertismentRequest $request)
    {
        $attributes = $request->validated();
        return $this->advertismentService->addAdvertisment($request, $attributes);
    }

    public function showAdvertisment(ShowAdvertismentRequest $request)
    {
        $adData = $this->advertismentService->showAdvertisment($request->validated()['advertisment_id']);
        if (!$adData) {
            return response()->json(['message' => 'Advertisement not found.'], 404);
        }

        return response()->json(['message' => 'Advertisement retrieved successfully.', 'advertisment' => $adData], 200);
    }

    public function getAdvertisments(Request $request)
    {
        $ads = $this->advertismentService->getAllAdvertisments($request->user());
        return response()->json(['message' => 'Advertisements retrieved successfully.', 'advertisments' => $ads], 200);
    }

    public function addAdvertismentImages(AddAdvertismentImagesRequest $request)
    {
        $result = $this->advertismentService->addAdvertismentImage(
            $request->validated()['advertisment_id'],
            $request->file('image')
        );

        if (!$result) {
            return response()->json(['message' => 'Unauthorized or operation failed.'], 403);
        }

        return response()->json(['message' => 'Image added successfully.', 'data' => $result], 201);
    }

    public function deleteAdvertismentImage(DeleteAdvertismentImageRequest $request)
    {
        $result = $this->advertismentService->deleteAdvertismentImage($request->validated()['image_id']);

        if (!$result) {
            return response()->json(['message' => 'Unauthorized or image not found.'], 403);
        }

        return response()->json(['message' => 'Image deleted successfully.'], 200);
    }

    public function getAdvertismentImages(GetAdvertismentImagesRequest $request)
    {
        $advertismentId = $request->validated()['advertisment_id'];
        $result = $this->advertismentService->getAdvertismentImages($advertismentId);
        return response()->json(['message' => 'Images retrieved successfully.', 'data' => $result], 200);
    }
}
