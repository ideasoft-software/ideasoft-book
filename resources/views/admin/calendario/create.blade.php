@extends('layouts.app')
@section('title', 'Programar Nueva Cita')
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
                                <h1 class="text-primary">Programar Nueva Cita</h1>
                                <div class="float-sm-right text-zero">

                                    <!--<div class="btn-group ">
                                        <div class="btn btn-primary btn-lg pl-4 pr-0 check-button">
                                            <label class="custom-control custom-checkbox mb-0 d-inline-block">
                                                <input type="checkbox" class="custom-control-input" id="checkAll">
                                                <span class="custom-control-label"></span>
                                            </label>
                                        </div>
                                        <button type="button" class="btn btn-lg btn-primary dropdown-toggle dropdown-toggle-split pl-2 pr-2"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                        </div>
                                    </div>-->
                                </div>
                            </div>

                            <div class="separator mb-5"></div>
                        </div>
                    </div>

                    <div id="newDateComponent"/>

                </div>

            </div>
        </div>
    </div>
@endsection
@push('scripts')
<script src="https://raw.githubusercontent.com/uxsolutions/bootstrap-datepicker/master/js/locales/bootstrap-datepicker.es.js" charset="UTF-8"></script>
<script>
    $(".select2-single").select2({
        theme: "bootstrap",
        placeholder: "Buscar por nombre",
    });

    /*const datepicker= $(".date-inline");
    datepicker.datepicker({
        autoclose: true,
        language: 'es',
        format: 'dd/mm/yyyy',
        templates: {
            leftArrow: '<i class="simple-icon-arrow-left"></i>',
            rightArrow: '<i class="simple-icon-arrow-right"></i>'
        },
    });*/
    //datepicker.datepicker('update', '<?=NOW()->format('d')?>-<?=NOW()->format('m')?>-<?=NOW()->format('Y')?>');
</script>
@endpush
