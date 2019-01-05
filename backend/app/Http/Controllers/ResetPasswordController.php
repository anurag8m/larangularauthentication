<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Mail\ResetPasswordMail;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request) {
    	if(!$this->validateEmail($request->email))
    	{
    		return $this->failedResponse();
    	}
    	$this->sendTo($request->email);
    	return $this->successResponse();
    }

    public function sendTo($emailuser)
    {
    	$token = $this->createToken($emailuser);
    	Mail::to($emailuser)->send(new ResetPasswordMail($token));
    }

    public function createToken($emailuser)
    {
    	$oldToken = DB::table('password_resets')->where('email',$emailuser)->first();
    	if($oldToken)
    	{
    		return $oldToken->token;
    	}
    	$token = str_random(60);
    	$this->saveToken($token,$emailuser);
    	return $token;
    }

    public function saveToken($token,$emailuser)
    {
    	DB::table('password_resets')->insert([
    		'email' => $emailuser,
    		'token' => $token,
    		'created_at' => Carbon::now()
    	]);
    }

    // !! is used to get boolean value i.e true or false
    public function validateEmail($email) {
    	return !!User::where('email',$email)->first();
    }

    public function failedResponse() {
    	return response()->json([
    		'error' => 'Email does not exist'
    	], Response::HTTP_NOT_FOUND);
    }

    public function successResponse() {
    	return response()->json([
    		'data' => 'Rest email password sent successfully, please check your inbox.'
    	], Response::HTTP_OK);
    }
}
