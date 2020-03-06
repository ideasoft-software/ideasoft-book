@extends('layouts.app')
@section('title', 'Registrar nuevo empleado')
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
                                <h1>Registrar nuevo empleado</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('employees.index') }}" class="btn btn-primary btn-lg">
                                        <i class="iconsmind-Numbering-List"></i> LISTA EMPLEADOS</a>
                                </div>
                            </div>
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <p>Completa el siguiente formulario para añadir un nuevo empleado.</p>

                            <form method="post" name="form_new_employee" id="form_new_employee">
                                @csrf
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Nombre</label>
                                        <input type="text" class="form-control" id="name" name="name" placeholder="Nombre">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="services">Servicios</label>
                                        <select class="form-control select2-multiple" name="services" id="services" multiple="multiple">
                                            @foreach(\App\Category::all() as $category)
                                                <optgroup label="{{ $category->name }}">
                                                    @foreach(
                                                    \App\Service::where('status', 1)->where('category_id', $category->id)->get()
                                                    as $service)
                                                        <option value="{{ $service->id }}">{{ $service->name }}</option>
                                                    @endforeach
                                                </optgroup>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="tel">Telefono</label>
                                        <input type="tel" class="form-control" id="tel" name="tel" placeholder="Teléfono">
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

                                <div class="form-row col-12 justify-content-center">
                                    <button type="button" class="btn btn-primary d-block mt-3 btn_register_employee">REGISTRAR</button>
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
    <script src="{{ asset('js/app/employees.js') }}"></script>
@endpush
