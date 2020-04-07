@extends('layouts.app')
@section('title', 'crear nuevo servicio')
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
                                <h1>Crear nuevo servicio</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('services.index') }}" class="btn btn-primary btn-lg"><i class="iconsmind-Numbering-List"></i> LISTA SERVICIOS</a>

                                </div>
                            </div>
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <p>Completa el siguiente formulario para crear un nuevo servicio.</p>

                            <form method="post" name="form_new_service" id="form_new_service">
                                @csrf
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Nombre del servicio</label>
                                        <input type="text" class="form-control" id="name" name="name" placeholder="Nombre Servicio">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="duration">Duración en minutos</label>
                                        <input type="hidden" id="duration_date_min" value="{{ Session::get('business_duration') }}">
                                        <input type="number" class="form-control" min="{{ Session::get('business_duration') }}" value="15" step="5" id="duration" name="duration" placeholder="Duración">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category_id">Categoria</label>
                                        <select class="form-control" name="category_id" id="category_id">
                                            <option value="" selected disabled>Seleccione...</option>
                                            @foreach(App\Category::all() as $category)
                                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="value">Valor del servicio</label>
                                        <input type="number" class="form-control" min="1000" id="value" value="1000" step="500" name="value" placeholder="Valor del servicio">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="description">Descripción del servicio</label>
                                        <textarea class="form-control" id="description" name="description" placeholder="Descripción u observaciones del servicio..."></textarea>
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
                                    <button type="button" class="btn btn-primary d-block mt-3 btn_create_service">CREAR</button>
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
    <script src="{{ asset('js/app/services.js') }}"></script>
@endpush
