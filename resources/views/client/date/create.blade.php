@extends('layouts.guest')
@section('title', 'Iniciar Sesión')
@section('content')
    <a href="{{ route('home') }}">
        <span class="logo-single"></span>
    </a>
    <h2 class="font-weight-bolder text-center text-primary mb-5">RESERVAR UNA CITA</h2>

    <div id="newDateGuestComponent" class="p-0"></div>
@endsection
@push('scripts')
    <script src="https://raw.githubusercontent.com/uxsolutions/bootstrap-datepicker/master/js/locales/bootstrap-datepicker.es.js" charset="UTF-8"></script>
    <script>
        $(".select2-single").select2({
            theme: "bootstrap",
            placeholder: "Buscar por nombre",
        });
    </script>
@endpush

