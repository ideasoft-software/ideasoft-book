import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ListDates extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.formatAMPM = this.formatAMPM.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
        this.formatMonthString = this.formatMonthString.bind(this);
        this.formatStatus = this.formatStatus.bind(this);
        this.formatDayString = this.formatDayString.bind(this);
        this.formatRelativeTime = this.formatRelativeTime.bind(this);
        this.state = {
            today: null,
            tomorrow: null,
            historical: null,
            dateToday: {
                date: null,
                date_f: null,
                day: null,
                dayNumber: null,
                month: null,
                year: null,
            },
            dateTomorrow: {
                date: null,
                date_t: null,
                day: null,
                dayNumber: null,
                month: null,
                year: null,
            },
        }
    }
    componentDidMount() {
        this.getData();
        var date = new Date();
        var month_today = date.getMonth() + 1;
        var day_today = date.getDate();
        month_today = month_today < 10 ? '0' + month_today : month_today;
        day_today = day_today < 10 ? '0' + day_today : day_today;
        var date_f = date.getFullYear() + '' + month_today + '' + day_today;
        var date_today = day_today + '-' + month_today + '-' + date.getFullYear();

        var date_tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
        var month_tomorrow = date_tomorrow.getMonth() + 1;
        var day_tomorrow = date_tomorrow.getDate();
        month_tomorrow = month_tomorrow < 10 ? '0' + month_tomorrow : month_tomorrow;
        day_tomorrow = day_tomorrow < 10 ? '0' + day_tomorrow : day_tomorrow;
        var date_t = date_tomorrow.getFullYear() + '' + month_tomorrow + '' + day_tomorrow;
        var tomorrow = day_tomorrow + '-' + month_tomorrow + '-' + date_tomorrow.getFullYear();

        this.setState({
            dateToday: {
                date: date_today,
                date_f: date_f,
                day: day_today,
                dayNumber: date.getDay(),
                month: month_today,
                year: date.getFullYear(),
            },
            dateTomorrow: {
                date: tomorrow,
                date_t: date_t,
                day: day_tomorrow,
                dayNumber: date_tomorrow.getDay(),
                month: month_tomorrow,
                year: date_tomorrow.getFullYear(),
            }
        });

        $(document).ready(function () {
            var table= $('#table_historical_dates');
            table.DataTable({
                pageLength: 10,
                lengthMenu: [
                    [10, 25, 50, 100, -1], ['10 cols', '25 cols', '50 cols', '50 cols', 'Mostrar Todos']
                ],
                "deferRender": true,
                order: [0, 'desc'],
                "columnDefs": [
                    { targets: [2,5,6], orderable: false },
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
                    {data: null,
                        render: function (data) {
                            var date= data.date;
                            var array_date= date.split("-");
                            date= array_date[0]+''+array_date[1]+''+array_date[2];
                            var hour= data.start;

                            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

                            var time= date+''+hour;
                            var relative_time= moment(time, "YYYYMMDDHH:mm").fromNow();

                            let hour_date = hour.split(':');
                            var hours = hour_date[0];
                            var minutes = hour_date[1];
                            var ampm = hours >= 12 ? 'pm' : 'am';
                            hours = hours % 12;
                            hours = hours ? hours : 12; // the hour '0' should be '12'
                            minutes = minutes < 10 ? minutes : minutes;
                            var strTime = hours + ':' + minutes + ' ' + ampm;

                            var date_string= array_date[2]+" de "+months[array_date[1] - 1];
                            var date_time= date_string+"</br>"+strTime+"</br>"+relative_time;
                            return date_time;
                        }
                    },
                    {data: 'service.name'},
                    {data: 'client.name'},
                    {data: null,
                        render: function (data) {
                            var status= parseInt(data.status);
                            var span= '';
                            if (status === 1) {
                                span= '<div class="badge badge-pill badge-warning font-weight-bolder"><i class="simple-icon-options"></i> PENDIENTE<br> APROBACIÓN</div>';
                            } else if (status === 2) {
                                span= '<div class="badge badge-pill badge-success"><i class="simple-icon-check"></i> APROBADA</div>';
                            } else if (status === 3) {
                                span= '<div class="badge badge-pill badge-danger"><i class="simple-icon-close"></i> CANCELADA</div>';
                            } else if (status === 4) {
                                span= '<div class="badge badge-pill badge-info"><i class="simple-icon-clock"></i> EN PROCESO</div>';
                            } else {
                                span= '<div class="badge badge-pill badge-primary"><i class="iconsmind-Yes"></i> TERMINADA</div>';
                            }
                            return span;
                        }
                    },
                    {data: null,
                        render: function (data) {
                            var status= parseInt(data.status);
                            var actions= '';
                            if (status === 1) {
                                actions+= '<button class="btn btn-success btn-xs mx-1 mb-1"><i class="simple-icon-check"></i> APROBAR</button><br>';
                            } else if (status === 2) {
                                actions+= '<button class="btn btn-danger btn-xs mx-1 mb-1"><i class="simple-icon-close"></i> CANCELAR</button><br>' +
                                    '<button class="btn btn-info btn-xs mb-1"><i class="simple-icon-calendar"></i> REPROGRAMAR</button><br>';
                            } else if (status === 3) {
                                actions+= '';
                            } else if (status === 4) {
                                actions+= '<button class="btn btn-danger btn-xs mx-1 mb-1"><i class="simple-icon-close"></i> CANCELAR</button><br>';
                            } else {
                                actions+= '';
                            }
                            actions+= '<a href="/agenda/date/'+data.id+'" target="_blank" class="btn btn-light btn-sm mx-1 btn-xs"><i class="simple-icon-list"></i> MAS INFO</a>';
                            return actions;
                        }
                    },
                ],
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'pageLength',
                    },
                ],
            });
        });

    }
    async getData() {
        const URL = window.location;
        const response = await axios.post(URL);
        const data = response.data;
        this.setState({
            today: data.dates_today,
            tomorrow: data.dates_tomorrow,
            historical: data.dates_historical,
        });
    };
    formatAMPM(time) {
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
    formatTime(time) {
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
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };
    formatMonthString(month) {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return months[month - 1];
    }
    formatDayString(day) {
        const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
        return days[day];
    }
    formatStatus(status) {
        if (status === 1) {
            return <div className="badge badge-pill badge-warning">PENDIENTE APROBACIÓN</div>
        } else if (status === 2) {
            return <div className="badge badge-pill badge-success">APROBADA</div>
        } else if (status === 3) {
            return <div className="badge badge-pill badge-danger">CANCELADA</div>
        } else if (status === 4) {
            return <div className="badge badge-pill badge-info">EN PROCESO</div>
        } else {
            return <div className="badge badge-pill badge-primary">TERMINADA</div>
        }
    }
    formatRelativeTime(time) {
        return moment(time, "YYYYMMDDHH:mm").fromNow();
    }
    render() {
        return (
            <div className="container-fluid disable-text-selection">
                <div className="col-lg-12 mx-auto col-xs-12 mb-4">


                    <div className="col-md-12 col-lg-12 col-12 mb-4">
                        <div className="card">
                            {/* tabs */}
                            <div className="card-header pl-0 pr-0">
                                <ul className="nav nav-tabs card-header-tabs  ml-0 mr-0" role="tablist">
                                    <li className="nav-item col-4 text-center">
                                        <a className="nav-link active" id="today-tab_" data-toggle="tab"
                                           href="#todayTab" role="tab" aria-controls="first"
                                           aria-selected="true">HOY</a>
                                    </li>
                                    <li className="nav-item col-4 text-center">
                                        <a className="nav-link" id="tomorrow-tab_" data-toggle="tab" href="#tomorrowTab"
                                           role="tab" aria-controls="second" aria-selected="false">MAÑANA</a>
                                    </li>
                                    <li className="nav-item col-4 text-center">
                                        <a className="nav-link" id="historical-tab_" data-toggle="tab"
                                           href="#historicalTab" role="tab" aria-controls="second"
                                           aria-selected="false">HISTORICO</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    {/* tab today */}
                                    <div className="tab-pane fade show active justify-content-center" id="todayTab"
                                         role="tabpanel" aria-labelledby="today-tab_">
                                        <h1 align="center" className="mb-4 text-primary">Citas de
                                            hoy, {this.formatDayString(this.state.dateToday.dayNumber)} {this.state.dateToday.day} de {this.formatMonthString(this.state.dateToday.month)}</h1>

                                        {this.state.today &&
                                        <div className="row">
                                            <div className="col-12 list">

                                                {this.state.today.map((date, index) => {

                                                    return <div key={index} className="sortable-survey" data-toggle="collapse" data-target={"#date_" + date.id} aria-expanded="true" aria-controls={"date_" + date.id}>
                                                        <div className="card question d-flex mb-4 edit-quesiton">
                                                            <div className="d-flex flex-grow-1 min-width-zero">
                                                                <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                                    <div className="list-item-heading mb-1 truncate w-40 w-xs-100">
                                                                        <span className="text-muted">Inicio: </span> {this.formatAMPM(date.start)}<br/>
                                                                        <p className="text-muted">{this.formatRelativeTime(this.state.dateToday.date_f + '' + date.start)}</p>
                                                                    </div>
                                                                    <div className="mb-1 w-15 w-xs-100"><span
                                                                        className="text-muted">Cliente: </span>{date.client.name}
                                                                    </div>
                                                                    <p className="mb-1 w-15 w-xs-100">{date.service.name}</p>
                                                                    <div className="w-15 w-xs-100 text-right">
                                                                        {this.formatStatus(date.status)}
                                                                    </div>

                                                                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                                                        <a target="_blank"
                                                                           href={"/agenda/date/" + date.id}
                                                                           className="btn btn-info mr-2 icon-button"
                                                                           data-toggle="tooltip" title="Más detalles">
                                                                            <i className="simple-icon-list"/>
                                                                        </a>

                                                                        <button className="btn btn-outline-theme-3 icon-button rotate-icon-click rotate"
                                                                            type="button" data-toggle="collapse"
                                                                            data-target={"#date_" + date.id}
                                                                            aria-expanded="true"
                                                                            aria-controls={"date_" + date.id}>
                                                                            <i className="simple-icon-arrow-down with-rotate-icon"/>
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="question-collapse collapse" id={"date_" + date.id}>
                                                                <div className="card-body pt-0">
                                                                    <div className="edit-mode">
                                                                        {/* <div className="separator mb-4"/> */}

                                                                        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center my-0 p-0">
                                                                            <div className="list-item-heading mb-1 truncate w-40 w-xs-100">
                                                                                <span className="text-muted">Fin: </span> {this.formatAMPM(date.end)}
                                                                            </div>

                                                                            <div className="mb-1 text-muted text-small w-15 w-xs-100">
                                                                                <p>{date.client.tel}</p>
                                                                                <p>{date.client.email}</p>
                                                                                <p>{date.client.notes}</p>
                                                                            </div>
                                                                            <div className="mb-1 text-muted text-small w-15 w-xs-100">
                                                                                <p>{date.service.duration} min.</p>
                                                                                <p>${this.formatNumber(date.service.value)}</p>
                                                                            </div>
                                                                            <div className="mb-1 text-muted text-small w-25 w-xs-100">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}

                                            </div>
                                        </div>
                                        }

                                        {!this.state.today &&
                                        <div className="alert alert-danger">
                                            <i className="iconsmind-Information"/> Error cargando las citas de hoy.
                                        </div>
                                        }

                                        {this.state.today &&
                                        <div>
                                            {this.state.today.length < 1 &&
                                            <div className="alert alert-info">
                                                <i className="iconsmind-Information"/> No hay citas para el día de
                                                hoy.
                                            </div>
                                            }
                                        </div>
                                        }


                                    </div>

                                    {/* tab tomorrow */}
                                    <div className="tab-pane fade" id="tomorrowTab" role="tabpanel"
                                         aria-labelledby="second-tab_">
                                        <h1 className="mb-4 text-center text-primary">Citas de
                                            mañana, {this.formatDayString(this.state.dateTomorrow.dayNumber)} {this.state.dateTomorrow.day} de {this.formatMonthString(this.state.dateTomorrow.month)}</h1>

                                        {this.state.tomorrow &&
                                        <div className="row">
                                            <div className="col-12 list">
                                                {this.state.tomorrow.map((date, index) => {

                                                    return <div key={index} className="sortable-survey"
                                                                data-toggle="collapse" data-target={"#date_" + date.id}
                                                                aria-expanded="true" aria-controls={"date_" + date.id}>
                                                        <div className="card question d-flex mb-4 edit-quesiton">

                                                            <div className="d-flex flex-grow-1 min-width-zero">
                                                                <div
                                                                    className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                                    <div className="list-item-heading mb-1 truncate w-40 w-xs-100">
                                                                        <span className="text-muted">Hora: </span> {this.formatAMPM(date.start)}
                                                                        <p className="text-muted">{this.formatRelativeTime(this.state.dateTomorrow.date_t + '' + date.start)}</p>
                                                                    </div>
                                                                    <div className="mb-1 w-15 w-xs-100"><span
                                                                        className="text-muted">Cliente: </span>{date.client.name}
                                                                    </div>
                                                                    <p className="mb-1 w-15 w-xs-100">{date.service.name}</p>
                                                                    <div className="w-15 w-xs-100 text-right">
                                                                        {this.formatStatus(date.status)}
                                                                    </div>

                                                                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                                                        <a target="_blank"
                                                                           href={"/agenda/date/" + date.id}
                                                                           className="btn btn-info mr-2 icon-button"
                                                                           data-toggle="tooltip" title="Más detalles">
                                                                            <i className="simple-icon-list"/>
                                                                        </a>
                                                                        <button
                                                                            className="btn btn-outline-theme-3 icon-button rotate-icon-click rotate"
                                                                            type="button" data-toggle="collapse"
                                                                            data-target={"#date_" + date.id}
                                                                            aria-expanded="true"
                                                                            aria-controls={"date_" + date.id}>
                                                                            <i className="simple-icon-arrow-down with-rotate-icon"/>
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="question-collapse collapse" id={"date_" + date.id}>
                                                                <div className="card-body pt-0">
                                                                    <div className="edit-mode">
                                                                        {/* <div className="separator mb-4"/> */}

                                                                        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center my-0">
                                                                            <div className="list-item-heading mb-1 truncate w-20 w-xs-100 my-0">
                                                                                <span className="text-muted">Fin: </span> {this.formatAMPM(date.end)}
                                                                            </div>
                                                                            <div
                                                                                className="mb-1 text-muted text-small w-15 w-xs-100">
                                                                                <p>{date.client.tel}</p>
                                                                                <p>{date.client.email}</p>
                                                                                <p>{date.client.notes}</p>
                                                                            </div>
                                                                            <div
                                                                                className="mb-1 text-muted text-small w-15 w-xs-100">
                                                                                <p>{date.service.duration} min.</p>
                                                                                <p>${this.formatNumber(date.service.value)}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        }

                                        {!this.state.tomorrow &&
                                        <div className="alert alert-danger">
                                            <i className="iconsmind-Information"></i> Error cargando las citas para el
                                            día de mañana.
                                        </div>
                                        }

                                        {this.state.tomorrow &&
                                        <div>
                                            {this.state.tomorrow.length < 1 &&
                                            <div className="alert alert-info">
                                                <i className="iconsmind-Information"></i> No hay citas para el día de
                                                mañana.
                                            </div>
                                            }
                                        </div>
                                        }


                                    </div>

                                    {/* tab historical */}
                                    <div className="tab-pane fade overflow-auto" id="historicalTab" role="tabpanel" aria-labelledby="historical-tab_">
                                        <h1 className="mb-4 text-center text-primary">HISTORICO</h1>

                                        <table id="table_historical_dates">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Día</th>
                                                <th>Fecha/Hora</th>
                                                <th>Servicio</th>
                                                <th>Cliente</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListDates;
if (document.getElementById('listDatesComponent')) {
    ReactDOM.render(<ListDates/>, document.getElementById('listDatesComponent'));
}
