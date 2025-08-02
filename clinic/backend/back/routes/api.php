<?php

use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//auth
use App\Http\Controllers\AuthController;
//manager
use App\Http\Controllers\Manager\ClinicController;
use App\Http\Controllers\Manager\ServiceController;
use App\Http\Controllers\Manager\AdvertismentController;
use App\Http\Controllers\Manager\PaymentController;
//admin
use App\Http\Controllers\Admin\SubscriptionController;


//subscription price
Route::controller(SubscriptionController::class)->prefix('admin')->middleware('auth:sanctum')->group(function(){
    Route::middleware('role:admin,manager')->group(function () {
        Route::post('/check/clinic-subscription', 'checkClinicSubscription');
        Route::post('/check/advertisment-subscription', 'checkAdvertismentSubscription');
             });
    Route::middleware('role:admin')->group(function () {
        Route::post('/set/subscription-price', 'setSubscriptionPrice');
        Route::post('/set/advertisement-price', 'setAdvertisementPrice');
        Route::put('/update/subscription-price', 'updateSubscriptionPrice');
        Route::put('/update/advertisement-price', 'updateAdvertisementPrice');
        Route::post('/set/subscription-duration', 'setSubscriptionDuration');
        Route::post('/set/advertisement-duration', 'setAdvertisementDuration');
     });
});
//auth
Route::controller(AuthController::class)->group(function(){
    Route::post('/register/email','emailRegister');
    Route::post('/register/number','numberRegister');
    Route::post('/login/email','emailLogin');
    Route::post('/login/number','numberLogin');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout','logout');
        Route::post('/resend-otp','resendOTP');
        Route::post('/verify-otp','verify');
        Route::post('/reset-password/otp','resetPasswordOTP');
        Route::post('/reset-password/verify','resetPasswordVerify');
        Route::post('/user','fetchUser');
    });
});
//clinic
    Route::controller(ClinicController::class)->group(function(){
        Route::get('/get/clinics','getClinics');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/store/clinic','store');
            Route::post('/show/clinic','showClinic');
            Route::get('/clinic/images','getImages');

            Route::middleware('role:manager')->group(function () {
            Route::post('/add/image','addImage');
            Route::post('/delete/image','deleteImage');
            Route::post('/update/clinic','update');
            Route::get('/get/my-clinics' ,'getMyClinics');
            Route::get('/clinic/patients','getClinicPatients');
            Route::get('/clinic/doctors','getClinicDoctors');
            Route::get('/clinic/secretaries','getClinicSecretaries');
            Route::post('/clinic/add-staff','addStaff');
            Route::post('/clinic/update-staff-working-hours', 'updateStaffWorkingHours');
            });
        });
    });

//service
Route::controller(ServiceController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {

        Route::middleware('role:manager')->group(function () {
            Route::post('/add/service', 'addServiceToClinic');
            Route::post('/remove/service', 'removeServiceFromClinic');
            Route::post('/service/stages', 'getStages');
        });

        Route::middleware('role:manager,doctor')->group(function () {
            Route::post('/show/clinic/service', 'showClinicServices');
            Route::get('/get/services', 'getServices');
        });

    });
});

//advertisment
Route::controller(AdvertismentController::class)->group(function () {
    Route::get('/advertisements', 'getAdvertisments');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/advertisement/add', 'addAdvertisment');
        Route::post('/advertisement/show', 'showAdvertisment');

        Route::middleware('role:manager')->group(function () {
            Route::post('/advertisement/add-image', 'addAdvertismentImages');
            Route::post('/advertisement/delete-image', 'deleteAdvertismentImage');
            Route::post('/advertisement/images', 'getAdvertismentImages');
        });
    });
});
//payments
Route::controller(PaymentController::class)->group(function(){
    Route::get('/clinic/payment/success', 'paymentClinicSuccess')->name('clinic.payment.success');
    Route::get('/advertisment/payment/success', 'paymentAdvertisementSuccess')->name('advertisement.payment.success');
    Route::get('/payment/cancel', 'paymentCancel')->name('payment.cancel');
});




