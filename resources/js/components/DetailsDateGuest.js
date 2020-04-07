import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class DetailsDateGuest extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.formatAMPM = this.formatAMPM.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
        this.formatMonthString = this.formatMonthString.bind(this);
        this.formatStatus = this.formatStatus.bind(this);
        this.submitchangeStatusDate = this.submitchangeStatusDate.bind(this);
        this.relativeTime = this.relativeTime.bind(this);
        this.state = {
            details: null,
            employee_id: null
        }
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        const URL = window.location;
        const response = await axios.post(URL);
        const data = response.data;
        const employee_id = data.employee.id;
        this.setState({
            details: data,
            employee_id
        });
        const select = "#employee_date option[value=" + employee_id + "]";
        $(select).attr("selected", true);
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

    formatStatus(status) {
        if (status === 1) {
            return <div className="badge badge-warning">PENDIENTE APROBACIÓN</div>
        } else if (status === 2) {
            return <div className="badge badge-success">APROBADA</div>
        } else if (status === 3) {
            return <div className="badge badge-danger">CANCELADA</div>
        } else if (status === 4) {
            return <div className="badge badge-info">EN PROCESO</div>
        } else {
            return <div className="badge badge-primary">TERMINADA</div>
        }
    }

    async submitchangeStatusDate(status) {
        const URL = '/agenda/changeStatusDate';
        const response = await axios.post(URL, {
            date_id: this.state.details.id,
            employee_id: this.state.employee_id,
            status: status,
        });
        const data = response.data;

        if (data === 'success') {
            notify("top", "center", "success", "Correcto", "Estado de la cita actualizado. Espera un momento...");
            location.reload();
        } else if (data === 'error_turns') {
            notify("top", "center", "danger", "Error", "Seleccione un horario valido.");
        } else {
            notify("top", "center", "danger", "Error", "Ha ocurrido un error cambiando el estado de la cita. Intenta de nuevo.");
        }
    }

    relativeTime() {
        var date = new Date();
        var month_today = date.getMonth() + 1;
        var day_today = date.getDate();
        month_today = month_today < 10 ? '0' + month_today : month_today;
        day_today = day_today < 10 ? '0' + day_today : day_today;
        var date_f = date.getFullYear() + '' + month_today + '' + day_today;
        var date_today = day_today + '-' + month_today + '-' + date.getFullYear();

        return moment(this.state.details.date + this.state.details.start, "YYYYMMDDHH:mm").fromNow();
    }

    render() {
        return (
            <div className="container-fluid disable-text-selection">
                <div className="col-lg-10 mx-auto col-xs-12 mb-4">
                    <div className="card ">
                        <div className="card-header">

                        </div>
                        {this.state.details &&
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12 mx-auto text-center">
                                    <h1 className="text-primary mb-0">{this.state.details.schedule.day}, {this.state.details.day} de {this.formatMonthString(this.state.details.month)} del {this.state.details.year}</h1>
                                    <h2 className="text-dark mb-0 "><i className="iconsmind-Time-Clock"/> {this.relativeTime()}</h2>

                                    <div className="form-group mb-0 text-lg-center">
                                        <div className="card-body">
                                            <p className="text-muted text-small mb-2">Hora Inicio:</p>
                                            <p className="mb-3">{this.formatAMPM(this.state.details.start)}</p>
                                            <p className="text-muted text-small mb-2">Hora Fin:</p>
                                            <p className="mb-3">{this.formatAMPM(this.state.details.end)}</p>
                                            <p className="text-muted text-small mb-2">Empleado:</p>
                                            <p className="mb-3">{this.state.details.employee.name}</p>
                                            <p className="text-muted text-small mb-2">Estado:</p>
                                            <p className="mb-3">{this.formatStatus(this.state.details.status)}</p>
                                            <p className="text-muted text-small mb-2">Observaciones:</p>
                                            <p className="mb-3">{this.state.details.description}</p>
                                            <p className="text-muted text-small mb-2">Cita Ingresada: </p>
                                            <p className="mb-3">{this.state.details.created_at}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row icon-cards-row mb-4 col-12 justify-content-center">
                                    <div className="col-md-4 col-lg-3 col-6">
                                        <div className="card">
                                            <div className="card-body text-center text-primary">
                                                <h3 className="mx-0">SERVICIO</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-3 col-6">
                                        <div className="card">
                                            <div className="card-body text-center  text-primary">
                                                <h3 className="mx-0">CLIENTE</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row icon-cards-row mb-4 col-12 justify-content-center">
                                    <div className="col-md-4 col-lg-3 col-6 mb-4">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="simple-icon-star"/>
                                                <p className="card-text font-weight-semibold mb-0 lead">{this.state.details.service.name}</p>
                                                <p className="text-center card-text mb-0"><i
                                                    className="iconsmind-Timer-2 text-one"/> {this.state.details.service.duration} min.
                                                </p>
                                                <p className="text-center card-text mb-0"><i
                                                    className="iconsmind-Dollar-Sign text-one"/> {this.formatNumber(this.state.details.service.value)}
                                                </p>
                                                <p className="text-center card-text"><i
                                                    className="iconsmind-Information text-one"/> {this.formatNumber(this.state.details.service.description)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-3 col-6 mb-4">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className="iconsmind-User"/>
                                                <p className="card-text font-weight-semibold mb-0 lead">{this.state.details.client.name}</p>
                                                <p className="text-center card-text mb-0"><i
                                                    className="iconsmind-Phone text-one"/> {this.state.details.client.tel}
                                                </p>
                                                <p className="text-center card-text"><i
                                                    className="iconsmind-Envelope text-one"/> {this.formatNumber(this.state.details.client.email)}
                                                </p>
                                                {this.state.details.client.notes &&
                                                <p className="text-center card-text"><i
                                                    className="iconsmind-Information text-one"/> {this.formatNumber(this.state.details.client.notes)}
                                                </p>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div className="col-md-12 col-lg-12 col-12 text-center mt-4">
                                    {this.state.details.status === 1 &&
                                    <div>

                                        <div className="form-group text-center col-lg-5 mx-auto mt-2 mb-5">
                                            <label htmlFor="employee_date" className="text-primary font-weight-bolder">MODIFICAR
                                                EMPLEADO CITA: </label>

                                            <select name="employee_date" defaultValue={"0"} id="employee_date"
                                                    onChange={(e) => this.setState({employee_id: e.target.value})}
                                                    className="form-control">
                                                {this.state.details.service.employees.map((employee, index) => {
                                                    return <option value={employee.employee_id}
                                                                   key={index}>{employee.name}</option>
                                                })}
                                            </select>
                                        </div>

                                        <button className="btn btn-success mx-1"
                                                onClick={() => this.submitchangeStatusDate(2)}><i
                                            className="simple-icon-check"/> APROBAR CITA
                                        </button>
                                        <button className="btn btn-info mx-1"><i
                                            className="iconsmind-Pencil"/> REPROGRAMAR CITA
                                        </button>
                                        <button className="btn btn-danger mx-1"
                                                onClick={() => this.submitchangeStatusDate(3)}><i
                                            className="iconsmind-Close"/> CANCELAR CITA
                                        </button>
                                    </div>
                                    }
                                    {this.state.details.status === 2 &&
                                    <div>
                                        <button className="btn btn-danger mx-1" onClick={() => this.submitchangeStatusDate(3)}><i
                                            className="iconsmind-Close"/> CANCELAR CITA
                                        </button>
                                        <button className="btn btn-info mx-1">
                                            <i className="iconsmind-Pencil"/> REPROGRAMAR CITA
                                        </button>
                                    </div>
                                    }
                                </div>

                            </div>
                        </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsDateGuest;
if (document.getElementById('detailsDateGuestComponent')) {
    ReactDOM.render(<DetailsDateGuest/>, document.getElementById('detailsDateGuestComponent'));
}
