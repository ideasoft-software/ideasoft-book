$(".btn_register_user").click(function () {
    let name= $("#name");
    let last_name= $("#last_name");
    let email= $("#email");
    let status= $("#status");
    let type= $("#type");
    let password= $("#password");
    var regemail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regPass= /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;

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
        return false;
    }
    if (!regPass.test(password.val())) {
        notify("top", "center", "danger", "Error", "Verifica el campo: Contraseña. ");
        password.focus();
        return false;
    }


    $.ajax({
        url: location.href,
        type: 'POST',
        data: $('#form_new_user').serialize(),
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Usuario creado. Espera un momento...");
                location.href= '/usuarios';
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "El Correo electrónico ingresado ya esta registrado en el sistema con otro usuario.");
                email.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });

});
