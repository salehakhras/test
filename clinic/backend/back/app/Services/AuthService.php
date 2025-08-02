<?php

namespace App\Services;

use Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Traits\Responses;
use App\Notifications\MailNotification;
use App\Permissions\Abilities;
use Illuminate\Support\Facades\Cookie;

class AuthService
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
                ->cookie('token', $token, 60 * 24 * 30, '/', null, false, true, true, 'Strict');
        }
        $data['token'] = $token;
        return $this->success($message, $data, 200);
    }

    private function extractToken($request)
    {
        $token = $request->bearerToken();
        if (!$token && $request->hasCookie('token')) {
            $token = $request->cookie('token');
        }
        return $token;
    }

    public function numberRegister($attributes)
    {
        $attributes['password'] = Hash::make($attributes['password']);
        $otp = (string) rand(100000, 999999);
        \Log::info('otp recieved: ', ['otp' => $otp]);
        $attributes['otp'] = Hash::make($otp);
        $attributes['expire_at'] = now()->addHour();
        $user = User::create($attributes);
        $user->addRoleByName('patient');
        $abilities = Abilities::getAbilities($user);
        $token = $user->createToken('user token for ' . $user->first_name, $abilities)->plainTextToken;
        return $this->returnTokenResponse(request(), $user, $token, 'Account created');
    }

    public function emailRegister($attributes)
    {
        $attributes['password'] = Hash::make($attributes['password']);
        $otp = (string) rand(100000, 999999);
        \Log::info('otp recieved: ', ['otp' => $otp]);
        $attributes['otp'] = Hash::make($otp);
        $attributes['expire_at'] = now()->addHour();
        $user = User::create($attributes);
        $user->addRoleByName('patient');
        $user->notify(new MailNotification($otp));
        $abilities = Abilities::getAbilities($user);
        $token = $user->createToken('user token for ' . $user->first_name, $abilities)->plainTextToken;
        return $this->returnTokenResponse(request(), $user, $token, 'Account created');
    }

    public function numberLogin($attributes)
    {
        if (!Auth::attempt($attributes)) {
            return $this->error('invalid credentials', 0);
        }
        $user = User::firstWhere('number', $attributes['number']);
        $user->fcm_token = $attributes['fcm_token'];
        $user->save();
        $abilities = Abilities::getAbilities($user);
        $token = $user->createToken('user token for ' . $user->first_name, $abilities)->plainTextToken;
        return $this->returnTokenResponse(request(), $user, $token, 'Login successfully');
    }


    public function emailLogin($attributes)
    {
        if (!Auth::attempt($attributes)) {
            return $this->error('invalid credentials', 0);
        }
        $user = User::firstWhere('email', $attributes['email']);
        $user->fcm_token = $attributes['fcm_token'];
        $user->save();
        $abilities = Abilities::getAbilities($user);
        $token = $user->createToken('user token for ' . $user->first_name, $abilities)->plainTextToken;
        return $this->returnTokenResponse(request(), $user, $token, 'Login successfully');
    }

    public function verify($attributes)
    {
        $user = User::find($attributes['id']);
        if (now()->greaterThan($user->expire_at)) {
            return $this->error('OTP expired', 1);
        }
        if (!Hash::check($attributes['otp'], $user->otp)) {
            return $this->error('Invalid OTP', 0);
        }
        $user->verified_at = now();
        $user->otp = null;
        $user->save();
        $abilities = Abilities::getAbilities($user);
        $token = $user->createToken('user token for ' . $user->first_name, $abilities)->plainTextToken;
        $user->load('roles');
        return $this->returnTokenResponse(request(), $user, $token, 'Verified successfully');
    }

    public function fetchUser($request)
    {
        $token = $this->extractToken($request);
        if (!$token) {
            return $this->error('Token not provided', 0);
        }
        $user = $request->user();
        $user = $request->user()->load('roles');
        if (!$user) {
            return $this->error('Invalid or expired token', 0);
        }
        return $this->returnTokenResponse(request(), $user, $token, 'User fetched successfully');
    }

    public function logout($request)
    {
        $request->user()->currentAccessToken()->delete();
        $user = User::find($request->user()->id);
        $user->fcm_token = null;
        $user->save();
        $clientType = $request->header('X-Client-Type');
        $response = $this->success('Logout successfully', (object)[], 200);
        if ($clientType === 'web') {
            $response = $response->withoutCookie('token');
        }
        return $response;
    }

    public function resendOTP($attributes)
    {
        $otp = (string) rand(100000, 999999);
        \Log::info('otp recieved: ', ['otp' => $otp]);
        $user = User::find($attributes['id']);
        $user->otp = Hash::make($otp);
        $user->expire_at = now()->addHour();
        $user->save();
        $user->notify(new MailNotification($otp));
        return $this->success('OTP sent', (object)[], 200);
    }

    public function resetPasswordOTP($attributes)
    {
        $otp = (string) rand(100000, 999999);
        $user = User::find($attributes['id']);
        $user->otp = Hash::make($otp);
        $user->expire_at = now()->addHour();
        $user->save();
        $user->notify(new MailNotification($otp));
        return $this->success('OTP sent', (object)[], 200);
    }

    public function resetPasswordVerify($attributes)
    {
        $user = User::find($attributes['id']);
        if (!Hash::check($attributes['otp'], $user->otp)) {
            return $this->error('Invalid OTP', 0);
        }
        if (now()->greaterThan($user->expire_at)) {
            return $this->error('OTP expired', 1);
        }
        $user->otp = null;
        $user->password = Hash::make($attributes['new_password']);
        $user->save();
        return $this->success('Password updated', (object)[], 200);
    }
}
