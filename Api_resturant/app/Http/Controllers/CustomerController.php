<?php

namespace App\Http\Controllers;

use App\Customs\Services\EmailVerificationService;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\ResendEmailVerificationLinkRequest;
use App\Http\Requests\VerifyEmailRequest;
use Illuminate\Support\Facades\Hash;


class CustomerController extends Controller
{
    //
    use Notifiable;
    protected $service;
    /**
     *test auth middleware  
     */
    public function test(Request $req)
    {
        return response()->json(["message"=>"success"]);
    }
    public function __construct(EmailVerificationService $service)
    {
        $this->service=$service;
    }
    public function register(RegistrationRequest $request)
    {
        // dd($request->validated('name'));
        $customer = Customer::create([
            // $request->validated()

            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => Hash::make($request->validated('password')),
            'phone' => $request->validated('phone'),
        ]);
        // dd($customer);
        if($customer)
        {
           // dd($customer instanceof \PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject);

            $this->service->sendVerificationlink($customer);
            $token = auth('api')->login($customer);
            return $this->responseWithToken($token,$customer);
        }
        else{
            return response()->json([
                'status' =>'failed',
                'message' =>'An error occure while trying to create user'
            ],500);
        }

    }
    /**
     * get token response
     */
    public function responseWithToken($token,$user)
    {
        return response()->json([
            'status'=>'success',
            'customer'=>$user,
            'access_token'=>$token,
            'type'=>'bearer'
        ]);
    }
    /**
     * Resend email verification link 
     */
    public function resendVerificationEmailLink(ResendEmailVerificationLinkRequest $request)
    {
        return $this->service->resendLink($request->email);
    }
    /**
     * Verify Customer email
     */
    public function verifyCustomerEmail(VerifyEmailRequest $request)
    {
        return $this->service->verifyEmail($request->email,$request->token);
    }
    public function login(LoginRequest $request)
    {
       
        $token = auth('api')->attempt($request->validated());
        if($token)
        {
            return $this->responseWithToken($token,auth('api')->user());
        }else {
            return response()->json([
                'status'=>'failed',
                'message' => 'Invalid email or password'
            ], 401);
        }
    }
    public function logout(Request $request)
    {
        // Auth::logout();
        //havenot implemented yet
        return response()->json(['message' => 'Logout successful'], 200);
    }
}
