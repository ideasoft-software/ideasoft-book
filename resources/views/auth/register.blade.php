@extends('layouts.auth')
@section('title', 'Registrarse')
@section('content')
    <a href="{{ route('home') }}">
        <span class="logo-single"></span>
    </a>
    <h2 class="mb-4 font-weight-bolder text-primary">REGISTRARSE</h2>

    <form method="POST" action="{{ route('register') }}">
        @csrf

        <label class="form-group has-float-label mb-4">
            <input  id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus />
            <span>Nombre Completo</span>
        </label>
        @error('name')
        <div class="alert alert-danger" role="alert">
            <strong>{{ $message }}</strong>
        </div>
        @enderror


        <label class="form-group has-float-label mb-4">
            <input  id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" />
            <span>Correo Electrónico</span>
        </label>
        @error('email')
        <div class="alert alert-danger" role="alert">
                <strong>{{ $message }}</strong>
            </div>
        @enderror

        <label class="form-group has-float-label mb-4">
            <input  id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" />
            <span>Contraseña</span>
        </label>

        <label class="form-group has-float-label mb-4">
            <input  id="password-confirm" type="password" class="form-control @error('password') is-invalid @enderror" name="password_confirmation" required autocomplete="new-password" />
            <span>Contraseña</span>
        </label>
        @error('password')
        <div class="alert alert-danger" role="alert">
                <strong>{{ $message }}</strong>
            </div>
        @enderror


        <div class="d-flex justify-content-between align-items-center">
            <a href="{{ route('login') }}">¿Ya estas registrado? Inicia Sesión</a>
            <button class="btn btn-primary btn-lg btn-shadow" type="submit">REGISTRARME</button>
        </div>
    </form>
@endsection
