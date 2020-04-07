@extends('layouts.app')
@section('title', 'Detalles de la cita')
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
                                <h1 class="text-primary">Detalles de Cita</h1>
                                <div class="float-sm-right text-zero">
                                    <a href="{{ route('agenda') }}" class="btn btn-primary mr-1"><i class="iconsmind-Calendar icon-sm"></i> VER AGENDA</a>
                                    <a href="{{ route('agenda.new_date') }}" class="btn btn-success mr-1"><i class="iconsmind-Add icon-sm"></i> NUEVA CITA</a>
                                </div>
                            </div>
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div id="detailsDateComponent"/>

                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
<script>
</script>
@endpush
