@extends('layouts.app')
@section('title', 'Listado de Usuarios')
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
                                <h1>Listado de Usuarios</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('users.create') }}" class="btn btn-primary btn-lg"><i class="iconsmind-Add-User"></i> NUEVO</a>

                                </div>
                            </div>

                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="row card">
                        <div class="col-12 list mb-4 data-table-rows data-tables-hide-filter card-body">

                            <div id="datatableRows_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">

                            <table id="users-list">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NOMBRE</th>
                                        <th>CORREO</th>
                                        <th>ROL</th>
                                        <th class="text-center">ESTADO</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @foreach($users as $user)
                                    <tr>
                                        <td>{{ $user->id }}</td>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->email }}</td>
                                        <td>{{ $user->type }}</td>
                                        <td class="text-center">
                                            @if ($user->status)
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
            $("#users-list").DataTable({
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
