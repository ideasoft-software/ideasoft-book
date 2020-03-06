<?php

namespace App\Http\Controllers;

use App\Employee;
use App\EmployeeService;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(){
        $employees= Employee::with('services')->get();
        return view('admin.employees.index')
            ->with('employees', $employees);
    }

    public function create(){
        return view('admin.employees.create');
    }

    public function store(Request $request){
        $employee_count= Employee::where('name', $request->name)
            ->count();
        if ($employee_count){
            return "duplicate";
        }

        $employee= new Employee;
        $employee->name= mb_strtoupper($request->name, 'utf-8');
        $employee->tel= $request->tel;
        $employee->status= $request->status;
        if ($employee->save()){
            $servicios= explode(',', $request->services);
            foreach ($servicios as $service){
                $servicio_empleado= new EmployeeService;
                $servicio_empleado->service_id= $service;
                $servicio_empleado->employee_id= $employee->id;
                $servicio_empleado->save();
            }
            return "success";
        }
    }

    public function edit($id, Request $request)
    {
        $employee = Employee::where('employees.id', $id)
            ->with('services')
            ->first();
        if ($employee){
            return view('admin.employees.edit')
                ->with('employee', $employee);
        }else{
            abort(404);
        }
    }

    public function update($id, Request $request){
        $employee_count= Employee::where('name', $request->name)
            ->where('id', '!=', $id)
            ->count();
        if ($employee_count > 0){
            return "duplicate";
        }

        $employee= Employee::where('id', $id)->first();
        $employee->name= mb_strtoupper($request->name, 'utf-8');
        $employee->status= $request->status;
        $employee->tel= $request->tel;

        $servicios= explode(',', $request->services);

        EmployeeService::where('employee_id', $employee->id)->delete();

        foreach ($servicios as $service){
            $service_exist= EmployeeService::where('service_id', $service)
                ->where('employee_id', $employee->id)
                ->count();
            if ($service_exist > 0){
                continue;
            }else{
                $servicio_empleado= new EmployeeService;
                $servicio_empleado->service_id= $service;
                $servicio_empleado->employee_id= $employee->id;
                $servicio_empleado->save();
            }
        }

        if ($employee->save()){
            return "success";
        }
    }

    public function changeStatus($id){
        $employee= Employee::where('id', $id)->first();
        $employee->status= !(boolean) $employee->status;
        if ($employee->save()){
            if ((boolean) $employee->status){
                return "active";
            }else{
                return "inactive";
            }
        }else{
            return "error";
        }
    }
}
