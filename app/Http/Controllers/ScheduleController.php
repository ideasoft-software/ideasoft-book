<?php
namespace App\Http\Controllers;

use App\Hour;
use App\RestPeriod;
use App\Schedule;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function MongoDB\BSON\toJSON;

class ScheduleController extends Controller
{
    public function getData(){
        $schedule= Schedule::all();
        $rest_periods= RestPeriod::with('schedule')->get();
        $roles= DB::table('roles')->get();
        foreach ($roles as $role) {
            $role_permissions= DB::table('role_has_permissions')->where('role_id', $role->id)
                ->get();
            $role->permissions= $role_permissions;
        }
        $permissions= DB::table('permissions')->get();

        return [
            "schedule" => $schedule,
            "rest_periods" => $rest_periods,
            "permissions" => $permissions,
            "roles" => $roles
        ];
    }

    public function saveSchedule(Request $request){
        $dias= (array) $request->days;
        foreach ($dias as $day){
            $data= Schedule::where('id', '=', $day['id'])->first();
            $data->start= $day['start'];
            $data->end= $day['end'];
            $data->status= $day['status'];
            $data->save();
        }
        return "success";
    }

    public function getScheduleDateSelected(Request $request){
        $schedule= Schedule::with('rest_periods')
            ->where('schedules.number', $request->date['dayNumber'])
            ->first();

        $rest_periods= RestPeriod::where('schedule_id', $schedule->id)
            ->get();

        $intervalo = 30;
        $hora_inicio = new DateTime( $schedule->start );
        $hora_fin    = new DateTime( $schedule->end );
        $hora_fin->modify('+1 second'); // Añadimos 1 segundo para que nos muestre $hora_fin
        // Si la hora de inicio es superior a la hora fin
        // añadimos un día más a la hora fin
        if ($hora_inicio > $hora_fin) {
            $hora_fin->modify('+1 day');
        }

        // Establecemos el intervalo en minutos
        $intervalo = new DateInterval('PT'.$intervalo.'M');
        // Sacamos los periodos entre las horas
        $periodo = new DatePeriod($hora_inicio, $intervalo, $hora_fin);
        foreach($periodo as $hora){
            $flag= 0;
            $hour= $hora->format('H:i:00');
            $hour_row= Hour::where('hour', $hour)->first();
            if ($flag == 0){
                $horas[]= $hour_row;
            }
        }

        return [
            "schedule" => $schedule,
            "rest_periods" => $rest_periods,
            "hours" => $horas
        ];
    }

}
