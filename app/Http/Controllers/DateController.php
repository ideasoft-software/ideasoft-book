<?php

namespace App\Http\Controllers;

use App\Business;
use App\Category;
use App\Client;
use App\Date;
use App\Hour;
use App\HoursDate;
use App\Service;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Yajra\DataTables\DataTables;
use App\Mail\NewDateGuest;

class DateController extends Controller
{
    public function new_date(){
        return view('admin.calendario.create');
    }

    public function new_date_client(){
        return view('client.date.create');
    }

    public function getData(){
        $services = Service::where('status', 1)
            ->with('category')
            ->with('employees')
            ->get();
        $clients = Client::all();
        $general= Business::orderBy('id', 'DESC')->first();

        return [
            "services" => $services,
            "clients" => $clients,
            "duration_turn" => $general->interval_date
        ];
    }

    public function store(Request $request){
        $codigo = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 10);;
        $date = new Date;
        $date->service_id = $request->service;
        $date->code = $codigo;
        $date->client_id = $request->client;
        $date->schedule_id = $request->schedule;
        $date->employee_id = $request->employee;
        $date->date = new DateTime($request->date);
        $date->start = $request->start;
        $date->end = $request->end;
        $date->description = $request->observations;

        if (Auth::user() && Auth::user()->type == 1){
            $date->status = Date::APPROVED;
        }else{
            $date->status = Date::PENDING;
        }

        $hours = $request->turns;
        if (count($hours) < 1) {
            return ["message" => "error_turns", "id" => null];
        }

        //verify hour
        $actual_date= NOW()->format('Y-m-d');
        $fecha_date= $date->date->format('Y-m-d');

        $dates_schedule_selected= Date::where('date', $fecha_date)
            ->where('status', 2)
            ->where('employee_id', $request->employee)
            ->with('hours')
            ->get();

        if ($date->save()) {
            foreach ($hours as $hour) {
                $hour_row= Hour::where('id', $hour)->first();
                if (!$hour_row){
                    $date->delete();
                    return "error_hour_row";
                }

                if (count($dates_schedule_selected) > 0){
                    foreach ($dates_schedule_selected as $row_date){
                        foreach ($row_date->hours as $hour_date){
                            $hour_date_id = $hour_date->hour_id;
                            if ($hour_date_id === $hour){
                                return "hour_occupied";
                            }
                        }
                    }
                }

                $hour_date = new HoursDate;
                $hour_date->hour_id = $hour;
                $hour_date->date_id = $date->id;
                $hour_date->save();
            }
            Mail::to($date->client->email)->send(new NewDateGuest($date));
            return ["message" => "success", "id" => $date->id];
        }
        return ["message" => "error", "id" => null];
    }

    public function store_guest(Request $request){
        $codigo = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 10);;
        $date = new Date;
        $date->code = $codigo;
        $date->service_id = $request->service;
        $date->client_id = $request->client;
        $date->schedule_id = $request->schedule;
        $date->employee_id = 0;
        $date->date = new DateTime($request->date);
        $date->start = $request->start;
        $date->end = $request->end;
        $date->description = $request->observations;

        if (Auth::user() && Auth::user()->type == 1){
            $date->status = Date::APPROVED;
        }else{
            $date->status = Date::PENDING;
        }

        $hours = $request->turns;
        if (count($hours) < 1) {
            return ["message" => "error_turns", "id" => null];
        }

        //verify hour
        $actual_date= NOW()->format('Y-m-d');
        $fecha_date= $date->date->format('Y-m-d');

        $dates_schedule_selected= Date::where('date', $fecha_date)
            ->where('status', 2)
            ->where('employee_id', $request->employee)
            ->with('hours')
            ->get();

        if ($date->save()) {
            foreach ($hours as $hour) {
                $hour_row= Hour::where('id', $hour)->first();
                if (!$hour_row){
                    $date->delete();
                    return "error_hour_row";
                }

                if (count($dates_schedule_selected) > 0){
                    foreach ($dates_schedule_selected as $row_date){
                        foreach ($row_date->hours as $hour_date){
                            $hour_date_id = $hour_date->hour_id;
                            if ($hour_date_id === $hour){
                                return "hour_occupied";
                            }
                        }
                    }
                }

                $hour_date = new HoursDate;
                $hour_date->hour_id = $hour;
                $hour_date->date_id = $date->id;
                $hour_date->save();
            }
            Mail::to($date->client->email)->send(new NewDateGuest($date));
            return ["message" => "success", "id" => $date->id];
        }
        return ["message" => "error", "id" => null];
    }

    public function show($id){
        if (Auth::guest()){
            $date= Date::where('id', $id)->with('client')->first();
            //Mail::to($date->client->email)->send(new NewDateGuest($date));
            return view('client.date.email', compact('date'));
        }
        if ($id && Auth::user()->type === 1) {
            return view('admin.calendario.details');
        }

    }

    public function show_guest($code){
        $date = Date::where('code', $code)
            ->with('hours', 'schedule', 'client', 'service.employees','employee')
            ->first();
        if (!$date){
            return abort('404');
        }
        $array_date = explode('-', $date->date);
        $date->day = $array_date[2];
        $date->month = $array_date[1];
        $date->year = $array_date[0];
        return view('client.date.show', compact('date'));
    }

    public function getDetailsDate(Request $request){
        $date = Date::where('id', $request->id)
            ->with('hours', 'schedule', 'client', 'service.employees','employee')
            ->first();
        $array_date = explode('-', $date->date);
        $date->day = $array_date[2];
        $date->month = $array_date[1];
        $date->year = $array_date[0];
        return $date;
    }

    public function getDetailsDateGuest($code){
        $date = Date::where('code', $code)
            ->with('hours', 'schedule', 'client', 'service.employees','employee')
            ->first();
        if (!$date){
            return abort('404');
        }
        $array_date = explode('-', $date->date);
        $date->day = $array_date[2];
        $date->month = $array_date[1];
        $date->year = $array_date[0];
        return $date;
    }

    public function index()
    {
        return view('admin.calendario.list');
    }

    public function getListDates()
    {
        $today = NOW()->format('Y-m-d');
        $tomorrow = date("Y") . "-" . date("m") . "-" . (date("d") + 1);

        $dates_today = Date::where('date', $today)
            ->with('hours', 'schedule', 'client', 'service')
            ->get();

        $dates_tomorrow = Date::where('date', $tomorrow)
            ->with('hours', 'schedule', 'client', 'service')
            ->get();

        return [
            "dates_today" => $dates_today,
            "dates_tomorrow" => $dates_tomorrow
        ];
    }

    public function getHistoricalDates()
    {
        $dates_historical = Date::with('hours', 'schedule', 'client', 'service')->get();
        return DataTables::of($dates_historical)->make(true);
    }

    public function list()
    {
        $dates = Date::with('hours', 'client', 'service','employee')->get();
        $events = [];
        foreach ($dates as $date) {
            $name = $date->client->name . ": " . $date->service->name;
            $name_employee = $date->employee->name;
            $desc_client = $date->client->notes ? "notas cliente: " . $date->client->notes : '';
            $desc_date = $date->description ? "notas cita: " . $date->description : '';
            $description = "De " . $date->start . " hasta " . $date->end . ". " . $date->client->name . ", SERVICIO de "
                . $date->service->name . $desc_client . ". NO. CITA: #" . $date->id . ". " . $desc_date." EMPLEADO: ".$name_employee;
            $event = [
                "start" => $date->date . "T" . $date->start,
                "end" => $date->date . "T" . $date->end,
                "title" => $name,
                "description" => $description,
                "url" => route('agenda.details', $date->id),
                "allDay" => false
            ];
            array_push($events, $event);
        }
        return $events;
    }

    public function changeStatusDate(Request $request){
        $date= Date::where('id', $request->date_id)->first();
        if ($date->status != 5 && $date->status != 3){
            //aprovved
            if ($request->status === 2){
                $date->employee_id= $request->employee_id;
                $date->status= Date::APPROVED;
            }
            if ($request->status === 3){
                $date->status= Date::CANCELED;
            }
            if ($date->status === 4){
                $date->status= Date::FINISHED;
            }
            if ($date->save()){
                return "success";
            }
        } else {
            return "error";
        }

    }
}
