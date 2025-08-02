<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
//Requests
use App\Http\Requests\Auth\EmailRegisterRequest;
use App\Http\Requests\Auth\EmailLoginRequest;
use App\Http\Requests\Auth\NumberLoginRequest;
use App\Http\Requests\Auth\NumberRegisterRequest;
use App\Http\Requests\Auth\VerifyAccountRequest;
use App\Http\Requests\Auth\ResetPasswordOTPRequest;
use App\Http\Requests\Auth\ResetPasswordVerifyRequest;
use App\Http\Requests\Auth\ResendOtpRequest;
//Services
use App\Services\AuthService;
//Traits
use Illuminate\Http\ResponseTrait;
use App\Traits\Responses;
//Models
use App\Models\User;
class AuthController extends Controller
{
    use Responses;
    protected $service;
    public function __construct(AuthService $service){
        $this->service = $service;
    }

    public function numberRegister(NumberRegisterRequest $request){
        $attributes = $request->validate($request->rules());
        return $this->service->numberRegister($attributes);
    }

    public function emailRegister(EmailRegisterRequest $request){
        $attributes = $request->validate($request->rules());
        return $this->service->emailRegister($attributes);
    }

    public function numberLogin(NumberLoginRequest $request){
        $attributes = $request->validate($request->rules());
        return $this->service->numberLogin($attributes);
    }
    public function emailLogin(EmailLoginRequest $request){
        $attributes = $request->validate($request->rules());
        return $this->service->emailLogin($attributes);
    }

    public function logout(Request $request){
        return $this->service->logout($request);
    }

    public function resendOTP(ResendOTPRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['id'] = $request->user()->id;
        return $this->service->resendOTP($attributes);
    }

    public function verify(VerifyAccountRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['id'] = $request->user()->id;
        return $this->service->verify($attributes);
    }

    public function resetPasswordOTP(ResetPasswordOTPRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['id'] = $request->user()->id;
        return $this->service->resetPasswordOTP($attributes);
    }
    public function resetPasswordVerify(ResetPasswordVerifyRequest $request){
        $attributes = $request->validate($request->rules());
        $attributes['id'] = $request->user()->id;
        return $this->service->resetPasswordVerify($attributes);
    }
    
    public function fetchUser(Request $request)
    {
        return $this->service->fetchUser($request);
    }
}
