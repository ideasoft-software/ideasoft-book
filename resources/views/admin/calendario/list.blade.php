@extends('layouts.app')
@section('title', 'Listado de citas')
@push('styles')
@endpush

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">

                <div class="container-fluid disable-text-selection">
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-2 ">
                                <h1 class="text-primary">Listado de citas</h1>
                                <div class="float-sm-right text-zero">
                                </div>
                            </div>
                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div id="listDatesComponent"/>

                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
<script>
    /*$(document).ready(function () {
        var table= $('#table_historical_dates');

        table.DataTable({
            pageLength: 10,
            lengthMenu: [
                [10, 25, 50, 100, -1], ['10 cols', '25 cols', '50 cols', '50 cols', 'Mostrar Todos']
            ],
            processing: true,
            serverSide: true,
            ajax: {
                url: '/agenda/list/historical_dates',
                type: 'POST',
                data: {
                    '_token': $('meta[name="csrf-token"]').attr('content'),
                },
            },
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json',
                buttons: {
                    pageLength: 'Mostrar %d registros'
                }
            },
            columns: [
                {data: 'id'},
                {data: 'schedule.day'},
                {data: 'date'},
                {data: 'service.name'},
                {data: 'client.name'},
                {data: '-'},
                {data: '-'},
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pageLength',
                },
            ],
        });
    });*/
</script>
@endpush
