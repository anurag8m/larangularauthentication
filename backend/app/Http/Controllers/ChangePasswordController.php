<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;
use App\User;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
    	return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFound();
    }

    // function to check if token is valid or not?
    private function getPasswordResetTableRow($request)
    {
    	return DB::table('password_resets')->where(['email' => $request->email,'token'=>$request->resetToken]);
    }

    private function tokenNotFound()
    {
    	return response()->json(['error'=>'token or email is invalid'],Response::HTTP_UNPROCESSABLE_ENTITY);
    }
    private function changePassword($request) {
    	$user = User::whereEmail($request->email)->first();
    	$user->update(['password'=>$request->password]);
    	$this->getPasswordResetTableRow($request)->delete();
    	return response()->json(['data'=>'Password Successfully Changed'],Response::HTTP_CREATED);
    }
}
