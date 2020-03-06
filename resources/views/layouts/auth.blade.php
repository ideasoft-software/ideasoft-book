<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} | @yield('title', 'Inicio')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('font/iconsmind/style.css') }}"/>
    <link rel="stylesheet" href="{{ asset('font/simple-line-icons/css/simple-line-icons.css') }}"/>

    <link rel="stylesheet" href="{{ asset('css/vendor/bootstrap.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/bootstrap-float-label.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/main.css') }}"/>
    @stack('styles')
</head>

<body class="background show-spinner">
<div class="fixed-background"></div>
<main>
    <div class="container">
        <div class="row h-100">
            <div class="col-12 col-md-10 mx-auto my-auto">
                <div class="card auth-card">
                    <div class="position-relative image-side ">

                        <p class=" text-white h1">{{ config('app.name') }}</p>

                        <p class="white mb-0">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dolor doloribus ea mollitia obcaecati pariatur, voluptates. A at, ducimus eos fugit ipsum, libero quidem quod reiciendis, soluta totam veniam voluptas.
                        </p>
                    </div>
                    <div class="form-side">
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

    <script src="{{ asset('js/vendor/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ asset('js/vendor/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('js/dore.script.js') }}"></script>
    <script src="{{ asset('js/scripts.js') }}"></script>
    @stack('scripts')
</body>
</html>
