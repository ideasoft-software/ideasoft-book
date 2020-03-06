$(".btn_new_category").click(function () {
    let name= $("#name");
    let description= $("#description");

    if (name.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Nombre de Categoria");
        name.focus();
        return false;
    }

    $.ajax({
        url: '/categorias/new',
        type: 'POST',
        data: $('#form_new_category').serialize(),
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Categoria creada. Espera un momento...");
                location.reload();
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "La Categoria digitada ya esta registrada en el sistema");
                name.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });
});

$(".btnEditCategory").click(function () {
    let category_id= $(this).data('id');
    let category_name= $(this).data('name');
    let category_desc= $(this).data('description');

    $("#category_id").val(category_id);
    $("#name_category").val(category_name);
    $("#description_category").val(category_desc);
});

$(".btn_update_category").click(function () {
    let id= $("#category_id");
    let name= $("#name_category");

    if (!id || id <= 0){
        return false;
    }
    if (name.val() === '') {
        notify("top", "center", "danger", "Error", "Completa el campo: Nombre de Categoria");
        name.focus();
        return false;
    }

    $.ajax({
        url: '/categorias/'+id.val()+'/edit',
        type: 'POST',
        data: $('#form_edit_category').serialize(),
        success: function (response) {
            if (response === 'success') {
                notify("top", "center", "success", "Correcto", "Categoria Guardada. Espera un momento...");
                location.reload();
                return true;
            }if (response === 'duplicate') {
                notify("top", "center", "warning", "Error", "La Categoria digitada ya esta registrada en el sistema");
                name.focus();
                return true;
            } else {
                notify("top", "center", "danger", "Error", "Ha ocurrrido un error. Intente de nuevo");
                return false;
            }

        }
    });
});
