@extends('layouts.guest')
@section('title', 'Iniciar Sesión')
@section('content')
    <a href="{{ route('home') }}">
        <span class="logo-single"></span>
    </a>
    <h2 class="font-weight-bolder text-center text-primary mb-5">CITA CREADA, VERIFICA TU EMAIL</h2>

        <div class="justify-content-center">
            <p class="text-center">Tu cita con código <strong class="text-primary">#{{ str_pad($date->id, 5, '0', STR_PAD_LEFT) }}</strong> ha sido creada correctamente.<br>
                Para realizar seguimiento revisa tu correo electronico: <strong class="text-primary">{{ $date->client->email }}</strong></p>
        </div>
@endsection
@push('scripts')
@endpush

