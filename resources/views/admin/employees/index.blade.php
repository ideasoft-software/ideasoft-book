@extends('layouts.app')
@section('title', 'Listado de Empleados')
@push('styles')
    <style>
        div.dataTables_wrapper div.dataTables_filter input{
            border-radius: 10px;
            outline: none;
            border: 1px solid #ccc;
            padding: 5px;
        }
        div.dataTables_wrapper div.dataTables_length select{
            border-radius: 10px;
            outline: none;
            border: 1px solid #ccc;
            padding: 2px;
            margin-left: 5px;
            margin-right: 5px;
        }
    </style>
@endpush

@section('content')
    <div class="container-fluid">
        <div class="row  ">
            <div class="col-12">

                <div class="container-fluid disable-text-selection">
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-2 ">
                                <h1>Listado de Empleados</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('employees.create') }}" data-toggle="tooltip" title="Registrar un nuevo empleado" class="btn btn-primary btn-lg"><i class="iconsmind-Add-User"></i> NUEVO</a>

                                </div>
                            </div>

                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="row card">
                        <div class="col-12 list mb-4 data-table-rows data-tables-hide-filter card-body">

                            <div id="datatableRows_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">

                            <table id="employees-list">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NOMBRE</th>
                                        <th>TELEFONO</th>
                                        <th>SERVICIOS</th>
                                        <th class="text-center">ESTADO</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($employees as $employee)
                                    <tr>
                                        <td>{{ $employee->id }}</td>
                                        <td>{{ $employee->name }}</td>
                                        <td>{{ $employee->tel }}</td>
                                        <td>
                                            @foreach($employee->services as $service)
                                                <span class="badge badge-pill badge-primary">{{ $service->name }}</span>
                                            @endforeach
                                        </td>
                                        <td class="text-center">
                                            @if ($employee->status)
                                                <div class="badge badge-success" id="span_status_{{ $employee->id }}">ACTIVO</div>
                                                @else
                                                <div class="badge badge-danger" id="span_status_{{ $employee->id }}">INACTIVO</div>
                                            @endif
                                            <br>
                                            <button type="button" data-id="{{ $employee->id }}" class="btn btn-light btn-sm mt-2 btn_change_status_employee">
                                                <i class="iconsmind-Refresh"></i> CAMBIAR
                                            </button>
                                        </td>
                                        <td>
                                            <a href="{{ route('employees.edit', $employee->id) }}" class="btn btn-info"><i class="iconsmind-Idea-4"></i> EDITAR</a>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script src="{{ asset('js/app/employees.js') }}"></script>
    <script>
        $(document).ready(function () {
            $("#employees-list").DataTable({
                pageLength: 10,
                lengthMenu: [
                    [10, 25, 50, 100, -1], ['10 cols', '25 cols', '50 cols', '50 cols', 'Mostrar Todos']
                ],
                order: [1, 'asc'],
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
                },
            });
        });
    </script>
@endpush
