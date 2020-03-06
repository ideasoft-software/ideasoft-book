$(".btn_register_client").click(function () {
    let name= $("#name");
    let email= $("#email");
    let status= $("#status");
    let address= $("#address");
    let tel= $("#tel");
    var regemail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Nombres");
        name.focus();
        return false;
    }
    if (!regemail.test(email.val())) {
        notify("top", "center", "danger", "Error", "Completa el campo: Correo");
        email.focus();
        return false;
    }
    if (!$('input[name="status"]').is(':checked')){
        notify("top", "center", "danger", "Error", "Completa el campo: Estado");
        status.focus();
        return false;
    }
    if (address.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Dirección");
        address.focus();
        return false;
    }
    if (tel.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Teléfono");
        tel.focus();
        return false;
    }

    $.ajax({
        url: location.href,
        type: 'POST',
        data: $('#form_new_client').serialize(),
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Cliente creado. Espera un momento...");
                location.href= '/clientes';
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "El Correo electrónico o teléfono ingresado ya esta registrado en el sistema con un cliente.");
                email.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });

});
