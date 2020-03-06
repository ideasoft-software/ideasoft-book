@extends('layouts.auth')
@section('title', 'Recuperar contraseña')
@section('content')
    <a href="{{ route('home') }}">
        <span class="logo-single"></span>
    </a>
    <h2 class="mb-4 font-weight-bolder text-primary">RECUPERAR CONTRASEÑA</h2>

    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <label class="form-group has-float-label mb-4">
            <input  id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus />
            <span>Correo Electrónico</span>
        </label>
        @error('email')
            <span class="alert alert-danger" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <div class="d-flex justify-content-between align-items-center">
            <a href="{{ route('login') }}"><i class="iconsmind-Arrow-Back3"></i> Volver</a>
            <button class="btn btn-primary btn-lg btn-shadow" type="submit">ENVIAR LINK DE RECUPERACIÓN</button>
        </div>
    </form>
@endsection
