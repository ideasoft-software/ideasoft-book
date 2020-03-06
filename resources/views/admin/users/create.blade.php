@extends('layouts.app')
@section('title', 'Registrar nuevo usuario')
@push('styles')
@endpush

@section('content')
    <div class="container-fluid">
        <div class="row  ">
            <div class="col-12">

                <div class="container-fluid disable-text-selection">
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-2 ">
                                <h1>Registrar nuevo usuario</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('users.index') }}" class="btn btn-primary btn-lg">
                                        <i class="iconsmind-Numbering-List"></i> LISTA USUARIOS</a>
                                </div>
                            </div>
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <p>Completa el siguiente formulario para añadir un nuevo usuario.</p>

                            <form method="post" name="form_new_user" id="form_new_user">
                                @csrf
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Nombres</label>
                                        <input type="text" class="form-control" id="name" name="name" placeholder="Nombres">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="type">Rol Usuario</label>
                                        <select class="form-control" id="type" name="type">
                                            <option value="1">ADMINISTRADOR</option>
                                            <option value="2">EMPLEADO</option>
                                            <option value="3" selected>USUARIO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="email">Correo</label>
                                        <input type="email" class="form-control" id="email" name="email" placeholder="Correo electrónico">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Estado</label>
                                        <div class="mb-0">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" value="1" id="radio1" name="status" class="custom-control-input">
                                                <label class="custom-control-label" for="radio1">Activo</label>
                                            </div>
                                            <div class="custom-control custom-radio">
                                                <input value="0" type="radio" id="radio2" name="status" class="custom-control-input">
                                                <label class="custom-control-label" for="radio2">Inactivo</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="password">Contraseña </label>
                                        <input type="password" id="password" name="password" class="form-control">
                                        <span class="text-muted">6 caracteres mínimo incluyendo una mayúscula, minúscula y un número</span>
                                    </div>
                                </div>

                                <div class="form-row col-12 justify-content-center">
                                    <button type="button" class="btn btn-primary d-block mt-3 btn_register_user">REGISTRAR</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script src="{{ asset('js/app/users.js') }}"></script>
@endpush
