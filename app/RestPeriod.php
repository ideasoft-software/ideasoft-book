<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RestPeriod extends Model
{
    protected $table= "rest_periods";

    public function schedule(){
        return $this->belongsTo(Schedule::class,'schedule_id','id');
    }
}
