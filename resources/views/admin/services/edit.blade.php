@extends('layouts.app')
@section('title', 'Editar servicio')
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
                                <h1>Editar servicio</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('services.index') }}" class="btn btn-primary btn-lg"><i class="iconsmind-Numbering-List"></i> LISTA SERVICIOS</a>
                                </div>
                            </div>
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">

                            <form method="post" name="form_edit_service" id="form_edit_service">
                                @csrf
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Nombre del servicio</label>
                                        <input type="text" class="form-control" id="name" value="{{ $service->name }}" name="name" placeholder="Nombre Servicio">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="duration">Duración en minutos</label>
                                        <input type="number" class="form-control" min="15" value="{{ $service->duration }}" step="5" id="duration" name="duration" placeholder="Duración">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category_id">Categoria</label>
                                        <select class="form-control" name="category_id" id="category_id">
                                            <option value="" selected disabled>Seleccione...</option>
                                            @foreach(App\Category::all() as $category)
                                                @if ($service->category_id === $category->id)
                                                    <option selected value="{{ $category->id }}">{{ $category->name }}</option>
                                                @else
                                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="value">Valor del servicio</label>
                                        <input type="number" class="form-control" min="1000" id="value" value="{{ $service->value }}" step="500" name="value" placeholder="Valor del servicio">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="description">Descripción del servicio</label>
                                        <textarea class="form-control" id="description" name="description" placeholder="Descripción u observaciones del servicio...">{{ $service->description }}</textarea>
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Estado</label>
                                        <div class="mb-0">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" value="1" id="radio1" {{ $service->status ? 'checked': '' }} name="status" class="custom-control-input">
                                                <label class="custom-control-label" for="radio1">Activo</label>
                                            </div>
                                            <div class="custom-control custom-radio">
                                                <input value="0" type="radio" id="radio2" {{ !$service->status ? 'checked': '' }} name="status" class="custom-control-input">
                                                <label class="custom-control-label" for="radio2">Inactivo</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row col-12 justify-content-center">
                                    <button type="reset" class="btn btn-dark d-block mt-3"><i class="iconsmind-Refresh"></i> RESTABLECER</button>
                                    <button type="button" class="btn btn-primary d-block mt-3 btn_edit_service ml-1"><i class="iconsmind-Save"></i> GUARDAR DATOS</button>
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
