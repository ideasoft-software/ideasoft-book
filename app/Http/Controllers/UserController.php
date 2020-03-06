<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $users= User::all();
        return view('admin.users.index')
            ->with('users', $users);
    }

    public function create(){
        return view('admin.users.create');
    }

    public function store(Request $request){
        $user_count= User::where('email', $request->email)->count();
        if ($user_count){
            return "duplicate";
        }

        $user= new User;
        $user->name= mb_strtoupper($request->name, 'utf-8');
        $user->email= strtoupper($request->email);
        $user->type= $request->type;
        $user->status= $request->status;
        $user->password= bcrypt($request->password);
        if ($user->save()){
            return "success";
        }
    }
}
