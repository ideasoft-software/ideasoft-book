<?php

namespace App\Http\Controllers;

use App\Category;
use App\Client;
use App\Service;
use Illuminate\Http\Request;

class DateController extends Controller
{
    public function new_date(){
        return view('admin.calendario.create');
    }

    public function getData(){
        $services= Service::where('status', 1)->get();
        foreach ($services as $service){
            $category= Category::where('id', $service->category_id)->first();
            $service->category_name= $category->name;
        }
        $clients= Client::all();
        return [
            "services" => $services,
            "clients" => $clients
        ];
    }
}
