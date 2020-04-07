<?php
namespace App\Http\Controllers;

use App\Business;
use App\Date;
use App\Hour;
use App\RestPeriod;
use App\Schedule;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ScheduleController extends Controller
{
    public function getData(){
        $schedule= Schedule::all();
        $rest_periods= RestPeriod::with('schedule')->get();
        $roles= DB::table('roles')->get();
        $permissions= DB::table('permissions')->get();
        $general= Business::first();
        foreach ($roles as $role) {
            $permission_role= array();
            foreach ($permissions as $permission){
                $role_permissions= DB::table('role_has_permissions')
                    ->where('role_id', $role->id)
                    ->where('permission_id', $permission->id)
                    ->first();
                array_push($permission_role, [ 'permission_id' => $permission->id, 'status' => $role_permissions ? true : false ]);
            }
           $role->permissions= $permission_role;
        }
        $general->logo= Storage::url($general->logo);
        return [
            "schedule" => $schedule,
            "rest_periods" => $rest_periods,
            "permissions" => $permissions,
            "roles" => $roles,
            "general" => $general,
        ];
    }

    public function saveSchedule(Request $request){
        $dias= (array) $request->days;
        foreach ($dias as $day){
            $data= Schedule::where('id', '=', $day['id'])->first();
            $data->start_am= $day['start_am'];
            $data->start_pm= $day['start_pm'];

            $start_am = strtotime( $data->start_am);
            $end_am = strtotime( $data->end_am );
            if( $start_am > $end_am ) {
                //continue;
            }
            $data->end_am= $day['end_am'];
            $data->end_pm= $day['end_pm'];

            $start_pm = strtotime( $data->start_pm);
            $end_pm = strtotime( $data->end_pm );
            if( $start_pm > $end_pm ) {
                //continue;
            }

            $data->status= $day['status'];
            $data->save();
        }
        return "success";
    }

    public function getScheduleDateSelected(Request $request){
        $schedule= Schedule::with('rest_periods')
            ->where('schedules.number', $request->dayNumber)
            ->first();

        if (!$schedule->status){
            return [
                "schedule" => $schedule,
                "hours" => null
            ];
        }
        /*$rest_periods= RestPeriod::where('schedule_id', $schedule->id)
            ->orderBy('start', 'ASC')
            ->get();*/

        $actual_date= NOW()->format('Y-m-d');
        $fecha_date= $request->year."-".str_pad($request->month, 2, 0, STR_PAD_LEFT)."-".str_pad($request->day, 2, 0, STR_PAD_LEFT);

        $dates_schedule_selected= Date::where('date', $fecha_date)
            ->where('status', 2)
            ->where('employee_id', $request->employee_id)
            ->with('hours')
            ->get();

        $general= Business::orderBy('id', 'DESC')->first();
        $intervalo = $general->interval_date;

        //AM
        $start_am = strtotime($schedule->start_am);
        $end_am = strtotime($schedule->end_am);
        if ($start_am !== $end_am && $end_am > $start_am){
            $hora_inicio_am = new DateTime( $schedule->start_am );
            $hora_fin_am    = new DateTime( $schedule->end_am );
            $hora_fin_am->modify('+1 second');
            if ($hora_inicio_am > $hora_fin_am) {
                $hora_fin_am->modify('+1 day');
            }

            $intervalo_am = new DateInterval('PT'.$intervalo.'M');
            $periodos_am = new DatePeriod($hora_inicio_am, $intervalo_am, $hora_fin_am);

            foreach($periodos_am as $hora) {
                $hour = $hora->format('H:i:00');
                $hour_row = Hour::where('hour', $hour)->first();

                $hour_r = strtotime($hour);
                $end_am = strtotime($hora_fin_am->format('H:i:00'));
                if ($hour_r === $end_am) {
                    break;
                }

                if ($actual_date === $fecha_date) {
                    $hora_actual = NOW()->format('H:i:00');
                    $hora_actual = strtotime($hora_actual);
                    if ($hour_r < $hora_actual) {
                        continue;
                    }
                }

                if (count($dates_schedule_selected) > 0){
                    $flag= 1;
                    foreach ($dates_schedule_selected as $date){
                        foreach ($date->hours as $hour_sel_date){
                            if ($hour_sel_date->hour_id === $hour_row->id){
                                $flag= 0;
                                break;
                            }
                        }
                        /*$hour_start_date = strtotime( $date->start );
                        $hour_end_date = strtotime( $date->end );
                        if ($hour_start_date == $hour_r){
                            break;
                        }else{
                            if ($hour_r < $hour_end_date && $hour_r > $hour_start_date){
                                break;
                            }

                            $horas[]= $hour_row;
                            break;
                        }*/
                        if ($flag === 0){
                            break;
                        }
                    }
                    if ($flag === 1){
                        $horas[]= $hour_row;
                        continue;
                    }else{
                        $flag= 1;
                    }
                }else{
                    $horas[]= $hour_row;
                }

            }
        }

        //PM
        $start_pm = strtotime($schedule->start_pm);
        $end_pm = strtotime($schedule->end_pm);
        if ($start_pm !== $end_pm && $end_pm > $start_pm){
            $hora_inicio_pm = new DateTime( $schedule->start_pm );
            $hora_fin_pm    = new DateTime( $schedule->end_pm );
            $hora_fin_pm->modify('+1 second');
            if ($hora_inicio_pm > $hora_fin_pm) {
                $hora_fin_pm->modify('+1 day');
            }

            $intervalo_pm = new DateInterval('PT'.$intervalo.'M');
            $periodos_pm = new DatePeriod($hora_inicio_pm, $intervalo_pm, $hora_fin_pm);

            foreach($periodos_pm as $hora){
                $hour= $hora->format('H:i:00');
                $hour_row= Hour::where('hour', $hour)->first();
                if (!$hour_row) break;

                $hour_r = strtotime( $hour);
                $end_pm = strtotime( $hora_fin_pm->format('H:i:00'));
                if ($hour_r === $end_pm){
                    break;
                }

                if ($actual_date == $fecha_date){
                    $hora_actual= NOW()->format('H:i:00');
                    $hora_actual = strtotime( $hora_actual);
                    if ($hour_r < $hora_actual){
                        continue;
                    }
                }

                if (count($dates_schedule_selected) > 0){
                    $flag2= 1;
                    foreach ($dates_schedule_selected as $date){
                        foreach ($date->hours as $hour_sel_date){
                            if ($hour_sel_date->hour_id === $hour_row->id){
                                $flag2= 0;
                                break;
                            }
                        }
                        /*$hour_start_date = strtotime( $date->start );
                        $hour_end_date = strtotime( $date->end );
                        if ($hour_start_date == $hour_r){
                            break;
                        }else{
                            if ($hour_r < $hour_end_date && $hour_r > $hour_start_date){
                                break;
                            }

                            $horas[]= $hour_row;
                            break;
                        }*/
                        if ($flag2 === 0){
                            break;
                        }
                    }
                    if ($flag2 === 1){
                        $horas[]= $hour_row;
                        continue;
                    }else{
                        $flag2= 1;
                    }
                    /*foreach ($dates_schedule_selected as $date){
                        $hour_start_date = strtotime( $date->start );
                        $hour_end_date = strtotime( $date->end );
                        if ($hour_start_date == $hour_r){
                            break;
                        }else{
                            if ($hour_r < $hour_end_date && $hour_r > $hour_start_date){
                                break;
                            }
                            $horas[]= $hour_row;
                            break;
                        }
                    }*/
                }else{
                    $horas[]= $hour_row;
                }
            }
        }

        if (!isset($horas)){
            $horas= [];
        }
        //dd($horas);
        return [
            "schedule" => $schedule,
            "hours" => $horas
        ];
    }

}
