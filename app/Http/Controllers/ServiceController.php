<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(){
        $services= Service::with('category')
            ->orderBy('services.name','asc')
            ->get();
        return view('admin.services.index')
            ->with('services', $services);
    }

    public function create(){
        return view('admin.services.create');
    }

    public function store(Request $request){
        $service_count= Service::where('name', $request->name)
            ->where('category_id', $request->category_id)
            ->count();

        if ($service_count > 0){
            return "duplicate";
        }

        $service= new Service;
        $service->name= mb_strtoupper($request->name, 'utf-8');
        $service->duration= $request->duration;
        $service->category_id= $request->category_id;
        $service->value= $request->value;
        $service->description= mb_strtolower($request->description, 'utf-8');
        $service->status= $request->status;

        if ($service->save()){
            return "success";
        }
    }

    public function edit($id){
        $service= Service::where('id', $id)->first();
        if ($service){
            return view('admin.services.edit')
                ->with('service', $service);
        }else{
            abort(404);
        }
    }

    public function update($id, Request $request){
        $service_count= Service::where('name', $request->name)
            ->where('category_id', $request->category_id)
            ->where('id', '!=', $id)
            ->count();
        if ($service_count > 0){
            return "duplicate";
        }

        $service= Service::where('id', $id)->first();
        $service->name= mb_strtoupper($request->name, 'utf-8');
        $service->duration= $request->duration;
        $service->category_id= $request->category_id;
        $service->value= $request->value;
        $service->description= mb_strtolower($request->description, 'utf-8');
        $service->status= $request->status;

        if ($service->save()){
            return "success";
        }
    }
}
