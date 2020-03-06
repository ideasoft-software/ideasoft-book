@extends('layouts.app')
@section('title', 'Categorias')
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
                                <h1>Categorias</h1>
                                <div class="float-sm-right text-zero">
                                    <a data-toggle="modal" data-target="#modalNewCategory" href="{{ route('services.create') }}" class="btn btn-primary btn-lg"><i class="iconsmind-Add"></i> NUEVO</a>
                                </div>
                            </div>

                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div class="row mb-4">

                        @foreach($categories as $category)
                            <div class="col-md-12 mb-4">
                                <div class="card d-flex flex-row mb-3">
                                    <a class="d-flex" href="#">
                                        <img alt="Thumbnail" src="img/thumb-1.jpg" class="list-thumbnail responsive border-0">
                                    </a>
                                    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                                        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                            <a href="#" class="w-40 w-sm-100">
                                                <p class="list-item-heading mb-1 truncate">{{ $category->name }}</p>
                                                <p class="text-muted">{{ $category->description }}</p>
                                            </a>
                                            <span data-toggle="collapse" href="#collapse_{{ $category->id }}" aria-expanded="false"
                                               class="mb-1 text-muted text-small w-15 w-sm-100 badge badge-default">
                                                {{ $category->services_count }} Servicios
                                                <div class="collapse mt-2" id="collapse_{{ $category->id }}">
                                                    @foreach($category->services as $service) * {{ $service->name }} @endforeach
                                                </div>
                                            </span>
                                        </div>

                                        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                            <button data-toggle="modal" data-target="#modalEditCategory" data-id="{{ $category->id }}" data-name="{{ $category->name }}" data-description="{{ $category->description }}"
                                                    class="btn btn-primary btnEditCategory"><i class="iconsmind-Edit text-one"></i> EDITAR
                                            </button>
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


    <div class="modal fade show" id="modalNewCategory" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Nueva Categoria</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="#" id="form_new_category" name="form_new_category">
                        @csrf
                        <div class="form-group">
                            <label for="name" class="col-form-label">Nombre de Categoria:</label>
                            <input type="text" class="form-control" name="name" id="name">
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-form-label">Descripción (opcional):</label>
                            <input type="text" class="form-control" name="description" id="description">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary btn_new_category">CREAR</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade show" id="modalEditCategory" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar Categoria</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="#" id="form_edit_category" name="form_edit_category">
                        @csrf
                        <div class="form-group">
                            <label for="name_category" class="col-form-label">Nombre de Categoria:</label>
                            <input type="text" class="form-control" name="name_category" id="name_category">
                            <input type="hidden" name="category_id" id="category_id">
                        </div>
                        <div class="form-group">
                            <label for="description_category" class="col-form-label">Descripción (opcional):</label>
                            <input type="text" class="form-control" name="description_category" id="description_category">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary btn_update_category">GUARDAR DATOS</button>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script src="{{ asset('js/app/categories.js') }}"></script>
@endpush
