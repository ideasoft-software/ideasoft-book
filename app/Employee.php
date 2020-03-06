<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table= "employees";

    public function services(){
        return $this->hasMany(EmployeeService::class,'employee_id','id')
            ->join('services', 'services.id', 'employee_services.service_id');
    }
}
