<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required | email",
            "password" => "required",
            "phone" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ]);
        }
        $name = $request->name;
        $name = explode(" ", $name);
        $first_name = $name[0];
        $last_name = "";

        if (isset($name[1])) {
            $last_name = $name[1];
        }

        $userDataArray = array(
            "first_name" => $first_name,
            "last_name" => $last_name,
            "full_name" => $request->name,
            "email" => $request->email,
            "password" => md5($request->password),
            "phone" => $request->phone
        );

        $user_status = User::where("email", $request->email)->first();

        if (!is_null($user_status)) {
            return response()->json([
                "success" => false,
                "message" => "Email already registered"]);
        }

        $user = User::create($userDataArray);

        if (!is_null($user)) {
            return response()->json([
                "success" => true,
                "message" => "Registration successfully",
                "data" => $user]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Failed to register account"
            ]);
        }

    }

    // ------------ [ User Login ] -------------------
    public function signIn(Request $request)
    {

        $validator = Validator::make($request->all(),
            [
                "email" => "required|email",
                "password" => "required"
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "validation_error" => $validator->errors()
            ]);
        }

        // check if entered email exists in db
        $email_status = User::where("email", $request->email)->first();


        // if email exists then we will check password for the same email
        if (!is_null($email_status)) {
            $password_status = User::where("email", $request->email)
                ->where("password", md5($request->password))
                ->first();

            // if password is correct
            if (!is_null($password_status)) {
                $user = $this->userDetail($request->email);

                return response()->json([
                    "success" => true,
                    "message" => "You have logged in successfully",
                    "data" => $user
                ]);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Unable to login. Incorrect password."
                ]);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "Unable to login. Email doesn't exist."]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email)
    {
        $user = array();
        if ($email != "") {
            $user = User::where("email", $email)->first();
            return $user;
        }
    }
}
