@extends('layouts.app')
@section('title', 'Listado de Clientes')
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
                                <h1>Listado de Clientes</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('clients.create') }}" class="btn btn-primary btn-lg"><i class="iconsmind-Add-User"></i> NUEVO</a>

                                    <!--<div class="btn-group ">
                                        <div class="btn btn-primary btn-lg pl-4 pr-0 check-button">
                                            <label class="custom-control custom-checkbox mb-0 d-inline-block">
                                                <input type="checkbox" class="custom-control-input" id="checkAll">
                                                <span class="custom-control-label"></span>
                                            </label>
                                        </div>
                                        <button type="button" class="btn btn-lg btn-primary dropdown-toggle dropdown-toggle-split pl-2 pr-2"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                        </div>
                                    </div>-->
                                </div>
                            </div>

                            <!-- table option--
                            <div class="mb-2">
                                <a class="btn pt-0 pl-0 d-inline-block d-md-none" data-toggle="collapse" href="#displayOptions"
                                   role="button" aria-expanded="true" aria-controls="displayOptions">
                                    Display Options
                                    <i class="simple-icon-arrow-down align-middle"></i>
                                </a>
                                <div class="collapse d-md-block" id="displayOptions">
                            <span class="mr-3 mb-2 d-inline-block float-md-left">
                                <a href="#" class="mr-2 view-icon active">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                                        <path class="view-icon-svg" d="M17.5,3H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z" />
                                        <path class="view-icon-svg" d="M17.5,10H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z" />
                                        <path class="view-icon-svg" d="M17.5,17H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z" /></svg>
                                </a>
                                <a href="#" class="mr-2 view-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                                        <path class="view-icon-svg" d="M17.5,3H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                                        <path class="view-icon-svg" d="M3,2V3H1V2H3m.12-1H.88A.87.87,0,0,0,0,1.88V3.12A.87.87,0,0,0,.88,4H3.12A.87.87,0,0,0,4,3.12V1.88A.87.87,0,0,0,3.12,1Z" />
                                        <path class="view-icon-svg" d="M3,9v1H1V9H3m.12-1H.88A.87.87,0,0,0,0,8.88v1.24A.87.87,0,0,0,.88,11H3.12A.87.87,0,0,0,4,10.12V8.88A.87.87,0,0,0,3.12,8Z" />
                                        <path class="view-icon-svg" d="M3,16v1H1V16H3m.12-1H.88a.87.87,0,0,0-.88.88v1.24A.87.87,0,0,0,.88,18H3.12A.87.87,0,0,0,4,17.12V15.88A.87.87,0,0,0,3.12,15Z" />
                                        <path class="view-icon-svg" d="M17.5,10H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                                        <path class="view-icon-svg" d="M17.5,17H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" /></svg>
                                </a>
                                <a href="#" class="mr-2 view-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                                        <path class="view-icon-svg" d="M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z" />
                                        <path class="view-icon-svg" d="M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z" />
                                        <path class="view-icon-svg" d="M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z" />
                                        <path class="view-icon-svg" d="M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z" /></svg>
                                </a>
                            </span>
                                    <div class="d-block d-md-inline-block">
                                        <div class="btn-group float-md-left mr-1 mb-1">
                                            <button class="btn btn-outline-dark btn-xs dropdown-toggle" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Order By
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                            </div>
                                        </div>
                                        <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                            <input placeholder="Search...">
                                        </div>
                                    </div>
                                    <div class="float-md-right">
                                        <span class="text-muted text-small">Displaying 1-10 of 210 items </span>
                                        <button class="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                            20
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="#">10</a>
                                            <a class="dropdown-item active" href="#">20</a>
                                            <a class="dropdown-item" href="#">30</a>
                                            <a class="dropdown-item" href="#">50</a>
                                            <a class="dropdown-item" href="#">100</a>
                                        </div>
                                    </div>
                                </div>
                            </div>-->
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="row card">
                        <div class="col-12 list mb-4 data-table-rows data-tables-hide-filter card-body">

                            <div id="datatableRows_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">

                            <table id="clients-list">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NOMBRE</th>
                                        <th>CORREO</th>
                                        <th>TELÉFONO</th>
                                        <th>ESTADO</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($clients as $client)
                                    <tr>
                                        <td>{{ $client->id }}</td>
                                        <td>{{ $client->name }}</td>
                                        <td>{{ $client->email }}</td>
                                        <td>{{ $client->tel }}</td>
                                        <td class="text-center">
                                            @if ($client->status)
                                                <div class="badge badge-success">ACTIVO</div>
                                                @else
                                                <div class="badge badge-danger">INACTIVO</div>
                                            @endif
                                            <br>
                                            <button type="button" class="btn btn-light btn-sm mt-2"><i class="iconsmind-Refresh"></i> CAMBIAR</button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-info"><i class="iconsmind-Idea-4"></i> EDITAR</button>
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
    <script>
        $(document).ready(function () {
            $("#clients-list").DataTable({
                pageLength: 10,
                lengthMenu: [
                    [10, 25, 50, 100, -1], ['10 cols', '25 cols', '50 cols', '50 cols', 'Mostrar Todos']
                ],
                order: [0, 'desc'],
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json'
                },
            });
        });
    </script>
@endpush
