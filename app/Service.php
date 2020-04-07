<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table= "services";

    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function employees(){
        return $this->hasMany(EmployeeService::class, 'service_id','id')
            ->join('employees', 'employees.id', 'employee_services.employee_id')
            ->select('employees.name','service_id', 'employee_id')
            ->where('status', 1);
    }

}
