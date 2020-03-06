$(".btn_create_service").click(function () {
    let name= $("#name");
    let value= $("#value");
    let duration= $("#duration");
    let status= $("#status");
    let description= $("#description");
    let category= $("#category_id");

    if (name.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Nombre del servicio");
        name.focus();
        return false;
    }
    if (duration.val() <= 0 || duration.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Duración");
        duration.focus();
        return false;
    }
    if (category.val() === null) {
        notify("top", "center", "danger", "Error", "Seleccione Categoria");
        category.focus();
        return false;
    }
    if (value.val() <= 0 || value.val() === null ) {
        notify("top", "center", "danger", "Error", "Complete el campo Valor del servicio");
        value.focus();
        return false;
    }
    if (!$('input[name="status"]').is(':checked')){
        notify("top", "center", "danger", "Error", "Completa el campo: Estado");
        status.focus();
        return false;
    }

    $.ajax({
        url: location.href,
        type: 'POST',
        data: $('#form_new_service').serialize(),
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Servicio creado. Espera un momento...");
                location.href= '/servicios';
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "El servicio digitado ya esta registrado en el sistema");
                name.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });

});

$(".btn_edit_service").click(function () {
    let name= $("#name");
    let value= $("#value");
    let duration= $("#duration");
    let status= $("#status");
    let description= $("#description");
    let category= $("#category_id");

    if (name.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Nombre del servicio");
        name.focus();
        return false;
    }
    if (duration.val() <= 0 || duration.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Duración");
        duration.focus();
        return false;
    }
    if (category.val() === null) {
        notify("top", "center", "danger", "Error", "Seleccione Categoria");
        category.focus();
        return false;
    }
    if (value.val() <= 0 || value.val() === null ) {
        notify("top", "center", "danger", "Error", "Complete el campo Valor del servicio");
        value.focus();
        return false;
    }
    if (!$('input[name="status"]').is(':checked')){
        notify("top", "center", "danger", "Error", "Completa el campo: Estado");
        status.focus();
        return false;
    }

    $.ajax({
        url: location.href,
        type: 'POST',
        data: $('#form_edit_service').serialize(),
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Servicio Actualizado. Espera un momento...");
                location.href= '/servicios';
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "El servicio digitado ya esta registrado en el sistema con otro registro.");
                name.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });

});
