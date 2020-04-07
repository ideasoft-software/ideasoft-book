<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function saveRolesPermissions(Request $request){
        $roles= $request->roles;
        foreach ($roles as $role) {
            $permissions= $role['permissions'];
            foreach ($permissions as $permission){
                $role_permission= DB::table('role_has_permissions')
                    ->where('role_id', $role['id'])
                    ->where('permission_id', $permission['permission_id'])
                    ->first();
                if ($role_permission){
                    if (!$permission['status']){
                        $role_permission= DB::table('role_has_permissions')
                            ->where('role_id', $role['id'])
                            ->where('permission_id', $permission['permission_id'])
                            ->delete();
                    }
                }else{
                    if ($permission['status']){
                        $role_permission= DB::table('role_has_permissions')->insert(
                            ['permission_id' => $permission['permission_id'], 'role_id' => $role['id']]
                        );;
                    }

                }

            }
        }
        return "success";
    }
}
