<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
    const PENDING= 1;
    const APPROVED= 2;
    const CANCELED= 3;
    const ACTIVE= 4;
    const FINISHED= 5;

    public function hours(){
        return $this->hasMany(HoursDate::class, 'date_id','id')
            ->select('hour_id','date_id');
    }

    public function schedule(){
        return $this->belongsTo(Schedule::class,'schedule_id','id');
    }

    public function client(){
        return $this->belongsTo(Client::class,'client_id','id');
    }

    public function service(){
        return $this->belongsTo(Service::class,'service_id','id');
    }

    public function employee(){
        return $this->belongsTo(Employee::class,'employee_id','id');
    }

}
