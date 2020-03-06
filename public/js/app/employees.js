$(".btn_register_employee").click(function () {
    let name= $("#name");
    let status= $("#status");
    let service= $("#services");
    let tel= $("#tel");

    if (name.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Nombres");
        name.focus();
        return false;
    }
    if (service.val().length === 0 || service.val() === null) {
        notify("top", "center", "danger", "Error", "Selecciona al menos un servicio");
        service.focus();
        return false;
    }
    if (tel.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Teléfono");
        tel.focus();
        return false;
    }
    if (!$('input[name="status"]').is(':checked')){
        notify("top", "center", "danger", "Error", "Completa el campo: Estado");
        return false;
    }

    //$('#form_new_employee').serialize()
    $.ajax({
        url: location.href,
        type: 'POST',
        data: 'name='+name.val()+'&services='+service.val()+'&tel='+tel.val()+'&status='+$("input[name='status']:checked").val(),
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Empleado registrado. Espera un momento...");
                location.href= '/empleados';
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "El Nombre del empleado ingresado ya esta registrado en el sistema.");
                email.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });

});

$(".btn_edit_employee").click(function () {
    let name= $("#name");
    let status= $("#status");
    let service= $("#services");
    let tel= $("#tel");

    if (name.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Nombres");
        name.focus();
        return false;
    }
    if (service.val().length === 0 || service.val() === null) {
        notify("top", "center", "danger", "Error", "Selecciona al menos un servicio");
        service.focus();
        return false;
    }
    if (tel.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Teléfono");
        tel.focus();
        return false;
    }
    if (!$('input[name="status"]').is(':checked')){
        notify("top", "center", "danger", "Error", "Completa el campo: Estado");
        return false;
    }

    $.ajax({
        url: location.href,
        type: 'POST',
        data: 'name='+name.val()+'&services='+service.val()+'&tel='+tel.val()+'&status='+$("input[name='status']:checked").val(),
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Empleado registrado. Espera un momento...");
                location.href= '/empleados';
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "El Nombre del empleado ingresado ya esta registrado en el sistema.");
                email.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });

});

$(".btn_change_status_employee").click(function () {
    let empleado_id= $(this).data('id');
    $.ajax({
        url: location.href+'/'+empleado_id+'/changeStatus',
        type: 'POST',
        data: 'empleado_id='+empleado_id,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            if (response !== "error") {
                notify("top", "center", "success", "Correcto", "El Estado del Empleado ha sido cambiado.");
                if (response === "inactive"){
                    $("#span_status_"+empleado_id).removeClass(" badge-success");
                    $("#span_status_"+empleado_id).addClass(" badge-danger");
                    $("#span_status_"+empleado_id).html("INACTIVO");
                }else{
                    $("#span_status_"+empleado_id).removeClass(" badge-danger");
                    $("#span_status_"+empleado_id).addClass(" badge-success");
                    $("#span_status_"+empleado_id).html("ACTIVO");
                }
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });

});
