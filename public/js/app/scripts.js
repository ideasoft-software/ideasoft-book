function notify(placementFrom, placementAlign, type, title, message){
    $.notify(
        {
            title: "Bootstrap Notify",
            message: "Here is a notification!",
            target: "_blank"
        },
        {
            element: "body",
            position: null,
            type: type,
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            offset: 20,
            spacing: 10,
            z_index: 1081,
            delay: 4000,
            timer: 2000,
            url_target: "_blank",
            mouse_over: null,
            animate: {
                enter: "animated fadeInDown",
                exit: "animated fadeOutUp"
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: "class",
            template:
                '<div data-notify="container" class="col-11 col-sm-3 alert  alert-{0} " role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">'+title+'</span> ' +
                '<span data-notify="message">'+message+'</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                "</div>" +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                "</div>"
        }
    );
}

function formatAMPM(time) {
    let hour = time.split(':');
    var hours = hour[0];
    var minutes = hour[1];
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function formatTime(time) {
    let hour = time.split(':');
    let h = hour[0];
    let m = hour[1];
    let a = '';

    if (h >= 0 && h < 12) {
        a = 'AM';
    } else {
        a = 'PM';
    }

    if (h < 24 && m < 60) {
        return h + ':' + m + ' ' + a;
    } else {
        return '00:00';
    }
};
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
};
function formatMonthString(month) {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months[month - 1];
}
function formatDayString(day) {
    const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
    return days[day];
}
