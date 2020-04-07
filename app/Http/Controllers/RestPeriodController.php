<?php

namespace App\Http\Controllers;

use App\RestPeriod;
use Illuminate\Http\Request;

class RestPeriodController extends Controller
{
    public function store(Request $request){
        $exist= RestPeriod::where('start', date('H:i:s a', strtotime($request->start)))
            ->where('end', date('H:i:s a', strtotime($request->end)))
            ->where('schedule_id', $request->schedule_id)->count();

        $count_day= RestPeriod::where('schedule_id',  $request->schedule_id)
            ->count();
        if ($exist){
            return "duplicate";
        }
        if ($count_day == 2){
            return "day_limit";
        }
        $rest_period= new RestPeriod;
        $rest_period->start= $request->start;
        $rest_period->end= $request->end;
        $rest_period->schedule_id= $request->schedule_id;
        if ($rest_period->save()){
            return "success";
        }
    }

    public function saveRestPeriod(Request $request){
        $periods= (array) $request->periods;
        foreach ($periods as $period){
            $data= RestPeriod::where('id', '=', $period['id'])->first();
            $data->start= $period['start'];
            $data->end= $period['end'];
            $data->save();
        }
        return "success";
    }

    public function delete($id){
        dd($id);
    }
}
