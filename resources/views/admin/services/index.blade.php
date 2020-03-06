@extends('layouts.app')
@section('title', 'Servicios')
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
                                <h1>Servicios</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('services.create') }}" class="btn btn-primary btn-lg"><i class="iconsmind-Add"></i> NUEVO</a>

                                </div>
                            </div>

                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="row mb-4">

                        @foreach($services as $service)
                            <div class="col-xs-6 col-lg-3 col-12 mb-4">
                                <div class="card">
                                    <div class="position-absolute card-top-buttons">
                                        <a href="{{ route('services.edit', $service->id) }}" class="btn btn-dark shadow icon-button" data-toggle="tooltip" title="Editar">
                                            <i class="simple-icon-pencil"></i>
                                        </a>
                                    </div>
                                    <div class="position-relative">

                                        @if ($service->status)
                                            <span class="badge badge-pill badge-success position-absolute badge-top-left">ACTIVO</span>
                                        @else
                                            <span class="badge badge-pill badge-danger position-absolute badge-top-left">INACTIVO</span>
                                        @endif
                                    </div>
                                    <img class="card-img-top" src="img/card-thumb-1.jpg">
                                    <div class="card-body">
                                        <div class="row">
                                            <p class="list-item-heading mb-4 col-6">
                                                {{ $service->name }}
                                            </p>
                                            <p class="list-item-heading col-6">
                                                <span class="badge badge-pill badge-info text-small" data-toggle="tooltip" data-title="Categoria">{{ $service->category->name }}</span>
                                            </p>
                                        </div>
                                        <p class="text-muted">{{ $service->description }}</p>
                                        <div class="row">
                                            <p class="text-muted text-small mb-0 font-weight-light text-large col-6" data-toggle="tooltip" data-title="Duración">
                                                <i class="iconsmind-Timer-2 text-one"></i> {{ $service->duration  }} min.
                                            </p>
                                            <p class="text-muted text-small mb-0 font-weight-light text-large col-6" data-toggle="tooltip" data-title="Precio">
                                                <i class="iconsmind-Dollar-Sign text-one"></i> {{ number_format($service->value, 2, ',', '.')  }} COP
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach

                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script>
        $(document).ready(function () {
        });
    </script>
@endpush
