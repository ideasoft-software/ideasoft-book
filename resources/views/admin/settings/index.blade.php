@extends('layouts.app')
@section('title', 'Ajustes ')
@push('styles')
    <link rel="stylesheet" href="{{ asset('css/vendor/bootstrap-datetimepicker.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendor/cropper.min.css') }}">
@endpush
@section('content')
    <div class="container-fluid">
        <div class="row  ">
            <div class="col-12">

                <div id="setting"></div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script src="{{ asset('js/vendor/bootstrap-datetimepicker.min.js') }}"></script>
    <script src="{{ asset('js/vendor/cropper.min.js') }}"></script>
    <script>
    </script>
@endpush
