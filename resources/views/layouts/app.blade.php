<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} | @yield('title', 'Inicio')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('font/iconsmind/style.css') }}"/>
    <link rel="stylesheet" href="{{ asset('font/simple-line-icons/css/simple-line-icons.css') }}"/>

    <link rel="stylesheet" href="{{ asset('css/vendor/bootstrap.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/fullcalendar.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/dataTables.bootstrap4.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/datatables.responsive.bootstrap4.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/select2.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/select2-bootstrap.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/perfect-scrollbar.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/owl.carousel.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/bootstrap-stars.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/nouislider.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/vendor/bootstrap-datepicker3.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/main.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}"/>
    @stack('styles')
</head>

<body id="app-container" class="menu-default show-spinner">

    @include('layouts.nav')
    @include('layouts.sidebar')
    <main>
        @yield('content')
    </main>

    <script src="{{ asset('js/vendor/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ asset('js/vendor/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('js/vendor/Chart.bundle.min.js') }}"></script>
    <script src="{{ asset('js/vendor/chartjs-plugin-datalabels.js') }}"></script>
    <script src="{{ asset('js/vendor/moment.min.js') }}"></script>
    <script src="{{ asset('js/vendor/fullcalendar.min.js') }}"></script>
    <script src="{{ asset('js/vendor/datatables.min.js') }}"></script>
    <script src="{{ asset('js/vendor/perfect-scrollbar.min.js') }}"></script>
    <script src="{{ asset('js/vendor/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('js/vendor/progressbar.min.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.barrating.min.js') }}"></script>
    <script src="{{ asset('js/vendor/select2.full.js') }}"></script>
    <script src="{{ asset('js/vendor/nouislider.min.js') }}"></script>
    <script src="{{ asset('js/vendor/bootstrap-datepicker.js') }}"></script>
    <script src="{{ asset('js/vendor/bootstrap-notify.min.js') }}"></script>
    <script src="{{ asset('js/vendor/Sortable.js') }}"></script>
    <script src="{{ asset('js/vendor/mousetrap.min.js') }}"></script>
    <script src="{{ asset('js/dore.script.js') }}"></script>
    <script src="{{ asset('js/scripts.js') }}"></script>
    <script src="{{ asset('js/app/scripts.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    @stack('scripts')
</body>
</html>
