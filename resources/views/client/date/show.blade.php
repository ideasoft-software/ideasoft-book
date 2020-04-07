@extends('layouts.guest')
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
                                <h1 class="text-primary">Detalles de Cita #{{ str_pad($date->id, 5, '0', STR_PAD_LEFT) }}</h1>
                            </div>
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div id="detailsDateGuestComponent"></div>

                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
<script>
    
</script>
@endpush
