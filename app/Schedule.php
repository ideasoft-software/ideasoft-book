<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table= "schedules";

    public function rest_periods(){
        return $this->hasMany(RestPeriod::class, 'schedule_id','id')
            ->select('schedule_id','start','end','id');
    }
}
