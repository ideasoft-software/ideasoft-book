@extends('layouts.auth')
@section('title', 'Iniciar Sesión')
@section('content')
    <a href="{{ route('home') }}">
        <span class="logo-single"></span>
    </a>
    <h2 class="mb-4 font-weight-bolder text-primary">INGRESAR</h2>

    <form method="POST" action="{{ route('login') }}">
        @csrf
        <label class="form-group has-float-label mb-4">
            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
                   value="{{ old('email') }}" required autocomplete="email" autofocus/>
            <span>Correo Electrónico</span>
        </label>

        <label class="form-group has-float-label mb-4">
            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                   name="password" required autocomplete="current-password"/>
            <span>Contraseña</span>
        </label>
        @error('email')
        <div class="alert alert-danger" role="alert">
            <strong>{{ $message }}</strong>
        </div>
        @enderror
        @error('password')
        <div class="alert alert-danger" role="alert">
            <strong>{{ $message }}</strong>
        </div>
        @enderror

        <div class="d-flex justify-content-between align-items-center">
            @if (Route::has('password.request'))
                <a href="{{ route('password.request') }}">¿Olvidó su contraseña?</a>
            @endif
            <button class="btn btn-primary btn-lg btn-shadow" type="submit">ENTRAR</button>
        </div>

        <div class="d-flex justify-content-between align-items-center">
            <a href="{{ route('register') }}">¿Aún no tienes un usuario? Registrarse</a>
        </div>
    </form>
@endsection
