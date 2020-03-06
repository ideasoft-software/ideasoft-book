<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(){
        $clients= Client::all();
        return view('admin.clients.index')
            ->with('clients', $clients);
    }

    public function create(){
        $clients= Client::all();
        return view('admin.clients.create');
    }

    public function store(Request $request){
        $client_count_email= Client::where('email', $request->email)->count();
        $client_count_tel= Client::where('tel', $request->tel)->count();
        if ($client_count_tel > 0 || $client_count_email > 0){
            return "duplicate";
        }

        $client= new Client;
        $client->name= mb_strtoupper($request->name, 'utf-8');
        $client->email= strtoupper($request->email);
        $client->status= $request->status;
        $client->tel= $request->tel;
        $client->notes= $request->notes;
        $client->status= true;

        if ($client->save()){
            return "success";
        }
    }
}
