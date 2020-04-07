import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class NewDate extends Component {
    constructor(props) {
        super(props);
        this.formatTime = this.formatTime.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.formatAMPM = this.formatAMPM.bind(this);
        this.hoursDiference = this.hoursDiference.bind(this);
        this.formatMonthString = this.formatMonthString.bind(this);

        this.onChangeDate = this.onChangeDate.bind(this);

        this.handleChangeService = this.handleChangeService.bind(this);
        this.handleSelectHour = this.handleSelectHour.bind(this);
        this.handleSelectClient = this.handleSelectClient.bind(this);

        this.handleQuitSelectedClient = this.handleQuitSelectedClient.bind(this);
        this.handleChangeFormNewClient = this.handleChangeFormNewClient.bind(this);
        this.submitFormClient = this.submitFormClient.bind(this);
        this.submitNewDate = this.submitNewDate.bind(this);

        this.state = {
            services: [],
            clients: [],
            serviceSelected: null,
            serviceIndexSelected: null,
            step: 1,
            selectedDay: '',
            selectedMonth: '',
            selectedYear: '',
            selectedHour: null,
            selectedIndexHour: [],
            selectedHoursId: [],
            selectedFullDate: '',
            selectedClient: null,
            schedule: null,
            hours: [],
            rest_periods: [],
            start_date: '',
            end_date: '',
            formNewClient: {
                tel: null,
                name: '',
                email: '',
                notes: '',
                exist: false,
                exist_email: false
            },
            observations: null,
            employee_id: 0,
            duration_turn: 30
        };
    }
    componentDidMount() {
        this.getData();
        this.initDatepicker();
    }
    async getData() {
        const URL = '/agenda/new_date/getData';
        const response = await axios.post(URL);
        const data = response.data;
        if (!data){
            this.getData();
        }
        this.setState({
            services: data.services,
            clients: data.clients,
            duration_turn: parseInt(data.duration_turn)
        });
    };
    initDatepicker() {
        let today = new Date();
        this.setState({
            selectedDay: today.getDate(),
            selectedMonth: today.getMonth() + 1,
            selectedYear: today.getFullYear(),
            selectedFullDate: (today.getDate()) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
        });

        const Datepicker = $(".date-inline");
        Datepicker.datepicker({
            autoclose: true,
            maxViewMode: 0,
            language: 'es',
            format: 'dd/mm/yyyy',
            startDate: (today.getDate()) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
            endDate: '31-12-' + today.getFullYear() + 1,
            templates: {
                leftArrow: '<i class="simple-icon-arrow-left"></i>',
                rightArrow: '<i class="simple-icon-arrow-right"></i>'
            },
        });
        //Datepicker.datepicker('update', (today.getDate()) + '-' + (today.getMonth() + 1) + '-' + today.getFullYear());
        Datepicker.datepicker()
            .on('changeDate', () => this.onChangeDate(Datepicker.datepicker('getDate')));

        $('.select2-single').on('select2:select', (e) => this.handleSelectClient(e));
    }
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
    handleChangeService(e) {
        const service_id = this.state.services[e.target.value].id;
        this.setState({
            serviceIndexSelected: e.target.value,
            serviceSelected: service_id,
            selectedHour: null,
            selectedIndexHour: [],
            start_date: '',
            end_date: '',
            employee_id: 0
        });
        $("#employee_date  option[value=0]").attr("selected",true);
    };
    handleSelectClient(e) {
        let client= null;
        client = this.state.clients[e.target.value];
        if (!client){
            client= null;
            return true;
        }
        this.setState({
            selectedClient: client
        });
    };
    handleQuitSelectedClient(){
        this.setState({
            selectedClient: null
        });
        $('#client_list').val('99999').trigger('change.select2');
    }
    async submitFormClient() {
        var regemail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const URL = '/clientes/nuevo';
        const response = await axios.post(URL, this.state.formNewClient);
        const data = response.data;
        const form = this.state.formNewClient;
        if (!this.state.formNewClient.tel || this.state.formNewClient.tel.length < 9){
            notify("top", "center", "danger", "Error", "Verifica el campo: Número de contacto");
            $("#tel").focus();
            return;
        }
        if (!this.state.formNewClient.name){
            notify("top", "center", "danger", "Error", "Completa el campo: Nombre");
            $("#name").focus();
            return;
        }
        if (!regemail.test(this.state.formNewClient.email)) {
            notify("top", "center", "danger", "Error", "Verifica el campo: Correo electrónico");
            $("#email").focus();
            return;
        }

        if (data === 'success') {
            let clients= this.state.clients;
            let new_client= {
                name: this.state.formNewClient.name,
                tel: this.state.formNewClient.tel,
                email: this.state.formNewClient.email,
                notes: this.state.formNewClient.notes
            };
            clients.push(new_client);
            this.setState({
                selectedClient: new_client,
                clients,
                formNewClient: {
                    tel: null,
                    name: '',
                    email: '',
                    notes: '',
                    exist: false,
                    exist_email: false,
                }
            });
            $('#client_list').val(clients.length-1).trigger('change.select2');
            notify("top", "center", "success", "Error", "El cliente ha sido registrado y seleccionado correctamente.");
        }else if (data === 'duplicate'){
            notify("top", "center", "danger", "Error", "El número de contacto (teléfono) o correo electónico digitado ya se encuentra registrado con un cliente diferente.");
        }else{
            notify("top", "center", "danger", "Error", "Ha ocurrido un error. Intenta de nuevo.");
        }

    };
    async submitNewDate() {
        const URL = '/agenda/new_date';
        const response = await axios.post(URL, {
            service: this.state.serviceSelected,
            client: this.state.selectedClient.id,
            employee: this.state.employee_id,
            schedule: this.state.schedule.id,
            date: this.state.selectedFullDate,
            start: this.state.start_date,
            end: this.state.end_date,
            turns: this.state.selectedHoursId,
            observations: this.state.observations
        });
        const data = response.data;

        if (data.message === 'success') {
            notify("top", "center", "success", "Correcto", "Cita registrada. Espera un momento...");
            location.href= '/agenda/date/'+data.id;
        }else if (data.message === 'error_turns'){
            notify("top", "center", "danger", "Error", "Seleccione un horario valido.");
        }else{
            notify("top", "center", "danger", "Error", "Ha ocurrido un error registrando la cita. Intenta de nuevo.");
        }

    };
    validateForm(form) {
        if (form === 1) {
            //TODO pueden seleccionar varios servicios?...
            if (parseInt(this.state.serviceSelected) === 0 || this.state.serviceSelected === null || this.state.employee_id === null || parseInt(this.state.employee_id) === 0) {
                notify("top", "center", "danger", "Error", "Por favor selecciona un servicio y un empleado para continuar...");
                $("#service_id").focus();
                return false;
            }
        }
        if (form === 2) {
            if (!this.state.start_date) {
                notify("top", "center", "danger", "Error", "Elige fecha y hora de la fecha de la cita por favor...");
                return false;
            }
        }
        if (form === 3) {
            if (!this.state.selectedClient) {
                notify("top", "center", "danger", "Error", "Elige un cliente por favor...");
                $("#clients_list").select2('open');
                return false;
            }
        }
        this.setState({step: this.state.step + 1})
    }
    onChangeDate(newDate) {
        this.setState({
            selectedDay: newDate.getDate(),
            selectedMonth: newDate.getMonth() + 1,
            selectedYear: newDate.getFullYear(),
            selectedFullDate: (newDate.getDate()) + '-' + (newDate.getMonth() + 1) + '-' + newDate.getFullYear()
        });
        this.getScheduleDateSelected(newDate);
    }
    async getScheduleDateSelected(date) {
        const dataSelected = {
            day: date.getDate(),
            dayNumber: date.getDay(),
            month: (date.getMonth() + 1),
            year: date.getFullYear(),
            service_id: this.state.serviceSelected,
            employee_id: this.state.employee_id
        };

        const URL = '/agenda/new_date/getScheduleDateSelected';
        const response = await axios.post(URL, dataSelected);
        const data = response.data;
        this.setState({
            schedule: data.schedule,
            hours: data.hours,
            rest_periods: data.rest_periods,
            selectedHour: null,
            selectedIndexHour: [],
            selectedHoursId: [],
            start_date: '',
            end_date: ''
        });
    }
    hoursDiference(start, end){
        var hora_inicio = start;
        var hora_final = end;

        // Expresión regular para comprobar formato
        var formatohora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        // Si algún valor no tiene formato correcto sale
        if (!(hora_inicio.match(formatohora)
            && hora_final.match(formatohora))){
            return;
        }

        // Calcula los minutos de cada hora
        var minutos_inicio = hora_inicio.split(':')
            .reduce((p, c) => parseInt(p) * 60 + parseInt(c));
        var minutos_final = hora_final.split(':')
            .reduce((p, c) => parseInt(p) * 60 + parseInt(c));

        // Si la hora final es anterior a la hora inicial sale
        if (minutos_final < minutos_inicio) return;

        // Diferencia de minutos
        var diferencia = minutos_final - minutos_inicio;
        return diferencia;
        // Cálculo de horas y minutos de la diferencia
        var horas = Math.floor(diferencia / 60);
        var minutos = diferencia % 60;
        return (horas + ':' + (minutos < 10 ? '0' : '') + minutos);
    }
    handleSelectHour(index){
        this.setState({
            selectedHour: null,
            selectedIndexHour: [],
            selectedHoursId: [],
            start_date: '',
            end_date: ''
        });

        const hour= this.state.hours[index];

        const service= this.state.services[this.state.serviceIndexSelected];
        const duration_service= service.duration;
        const duration_turn_default= this.state.duration_turn;

        const hourArray= hour.hour.split(':');
        const hour_start= new Date(2020, 0, 1, hourArray[0], hourArray[1], 0);
        const hour_end= new Date(2020, 0, 1, hourArray[0], hourArray[1], 0);
        const minutes = hour_end.getMinutes();
        hour_end.setMinutes(minutes + duration_service);

        let hourEnd= '';
        if (hour_end.getMinutes() !== 0){
            hourEnd= hour_end.getHours()+':'+ hour_end.getMinutes();
        }else{
            hourEnd= hour_end.getHours()+':'+'0'+ hour_end.getMinutes();
        }

        let hourStart= hour_start.getHours()+':'+hour_start.getMinutes();
        if (hour_start.getMinutes() !== 0){
            hourStart= hour_start.getHours()+':'+ hour_start.getMinutes();
        }else{
            hourStart= hour_start.getHours()+':'+'0'+ hour_start.getMinutes();
        }

        //console.log("start: "+hourStart+' end: '+hourEnd);
        //const duration_turn= this.hoursDiference(hourStart, hourEnd);
        if (duration_service > duration_turn_default){
            var turns= Math.round(duration_service / duration_turn_default);
            //console.log("turns: "+turns);
            var turns_sel= [];
            var turns_id= [];
            for (var i=0; i < turns; i++){
                var index_hour= index + i;
                var hour_turn= this.state.hours[index_hour];

                if (turns_sel.length !== 0){
                    var index_ant= turns_sel[parseInt(turns_sel.length) - 1];
                    var hour_ant= this.state.hours[index_ant].hour;
                    hour_ant= hour_ant.split(":");
                    hour_ant= hour_ant[0]+':'+hour_ant[1];

                    var hour_sig= hour_turn.hour;
                    hour_sig= hour_sig.split(":");
                    hour_sig= hour_sig[0]+':'+hour_sig[1];

                    const diference= this.hoursDiference(hour_ant, hour_sig);

                    if (diference > duration_turn_default){
                        turns_sel= [];
                        hour_turn= [];
                        notify("top", "center", "danger", "Error", "No es posible asignar la totalidad de la duración del servicio a la cita. Elije un horario diferente.");
                        break;
                    }
                }

                //console.log(this.state.hours[index + i - 1].hour);
                //console.log(this.hoursDiference(this.state.hours[index + i - 1].hour, hour_turn.hour));
                //var hour_turn= this.state.hours[hour_row.id];
                if (hour_turn){
                    if (!hour_turn.id){
                        turns_sel= [];
                        hour_turn= [];
                        notify("top", "center", "danger", "Error", "No es posible asignar la totalidad de la duración del servicio a la cita. Elije un horario diferente.");
                        break;
                    }
                    turns_sel.push(index_hour);
                    turns_id.push(hour_turn.id);
                }else{
                    turns_sel= [];
                    hour_turn= [];
                    notify("top", "center", "danger", "Error", "No es posible asignar la totalidad de la duración del servicio a la cita. Elije un horario diferente.");
                    break;
                }
            }
            //console.log(turns_id);
            if (turns_sel.length === turns) {
                this.setState({
                    selectedHour: hour,
                    selectedIndexHour: turns_sel,
                    selectedHoursId: turns_id,
                    start_date: hourStart,
                    end_date: hourEnd
                });
            }else{
                this.setState({
                    selectedHour: null,
                    selectedIndexHour: [],
                    selectedHoursId: [],
                    start_date: '',
                    end_date: ''
                });
                $("button .btnCheckHour").removeClass('active');
            }
        }else{
            //this.state.hours[index]
            var turn_id= [this.state.hours[index].id];
            if (!turn_id){
                this.setState({
                    selectedHour: null,
                    selectedIndexHour: [],
                    selectedHoursId: [],
                    start_date: '',
                    end_date: ''
                });
                notify("top", "center", "danger", "Error", "No es posible asignar la hora seleccionada. Elije un horario diferente.");
                $("button .btnCheckHour").removeClass('active');
            }
            this.setState({
                selectedHour: hour,
                selectedIndexHour: [index],
                start_date: hourStart,
                selectedHoursId:turn_id,
                end_date: hourEnd
            });
        }
    }
    handleChangeFormNewClient(field, e){
        const form = this.state.formNewClient;
        if (field === 'tel'){
            let form_tel= parseInt(e.target.value);
            if (!form_tel){
                form_tel= null;
            }
            form.tel= form_tel;
            for (var i= 0; i < this.state.clients.length; i++){
                var tel_client= parseInt(this.state.clients[i].tel);
                if (tel_client === form_tel){
                    form.exist= true;
                    break;
                }else{
                    form.exist= false;
                }
            }
        } else if (field === 'name') {
            const form_name= e.target.value;
            form.name= form_name;
        } else if (field === 'email') {
            const form_email= e.target.value;
            form.email= form_email;
            for (var i= 0; i < this.state.clients.length; i++){
                var email_client= this.state.clients[i].email.toUpperCase();
                if (email_client === form_email.toUpperCase()){
                    form.exist_email= true;
                    break;
                }else{
                    form.exist_email= false;
                }
            }
        } else if (field === 'notes'){
            const form_notes= e.target.value;
            form.notes= form_notes;
        }
        this.setState({
            formNewClient: form
        });
    }
    render(){
        return (
            <div className="container-fluid disable-text-selection">

                <div className="col-lg-12 mx-auto col-xs-12 mb-4">
                    <div className="card ">
                        {/* tabs */}
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs" role="tablist">
                                <li className="nav-item w-25 text-center">
                                    <a className={ this.state.step >= 1 ? 'nav-link mb-0 pb-0 active': 'nav-link mb-0 pb-0 disabled' }  id="select-service" data-toggle="tab"
                                       href="#first" role="tab" aria-controls="first" aria-selected={ this.state.step === 1 }>
                                        <i className="simple-icon-star"/> PASO 1 <br/>
                                        <span className="">Seleccionar servicio</span>
                                    </a>
                                </li>
                                <li className="nav-item w-25 text-center">
                                    <a className={ this.state.step >= 2 ? 'nav-link mb-0 pb-0 active': 'nav-link mb-0 pb-0 disabled' } id="second-tab"
                                       data-toggle="tab" href="#second" role="tab" aria-controls="second"  aria-selected={ this.state.step === 2 }>
                                        <i className="iconsmind-Calendar-Clock"/> PASO 2<br/>
                                        <span className="mt-0 pt-0">Elegir fecha y hora</span>
                                    </a>
                                </li>
                                <li className="nav-item w-25 text-center">
                                    <a className={ this.state.step >= 3 ? 'nav-link mb-0 pb-0 active': 'nav-link mb-0 pb-0 disabled' } id="third-tab" data-toggle="tab" href="#third"
                                       role="tab" aria-controls="third"  aria-selected={ this.state.step === 3 }>
                                        <i className="simple-icon-user"/> PASO 3<br/>
                                        <span className="mt-0 pt-0">Datos de cliente</span>
                                    </a>
                                </li>
                                <li className="nav-item w-25 text-center">
                                    <a className={ this.state.step >= 4 ? 'nav-link mb-0 pb-0 active': 'nav-link mb-0 pb-0 disabled' } id="four-tab" data-toggle="tab" href="#four"
                                       role="tab" aria-controls="four"  aria-selected={ this.state.step === 4 }>
                                        <i className="simple-icon-check"/> PASO 4<br/>
                                        <span className="mt-0 pt-0">Confirmar la cita</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content">
                                {/* content tabs */}
                                {/* step 1 */}
                                <div className={ this.state.step === 1 ? 'tab-pane fade show active': 'tab-pane fade' } id="first" role="tabpanel" aria-labelledby="select-service">
                                    <h2 className="text-primary" align="center">SELECCIONE EL SERVICIO</h2>

                                    <form method="#" action="" name="selectServiceForm" id="selectServiceForm" className="justify-content-center text-center">

                                        <div className="form-group text-center col-lg-4 mx-auto">
                                            <p className="text-muted">Se muestran servicios en estado activo.</p>
                                            <select className="form-control" defaultValue={ this.state.serviceSelected } onChange={ (e) => this.handleChangeService(e) } name="service_id" id="service_id">
                                                <option value="0" selected disabled>Seleccione...</option>
                                                { this.state.services.map((service, index) => {
                                                    return <option key={index} value={ index }>{service.name}</option>
                                                })}
                                            </select>
                                        </div>

                                        { this.state.serviceSelected &&
                                            <div className="form-group mb-0">
                                                <div className="card-body">
                                                    <p className="text-muted text-small mb-2">Descripción</p>
                                                    <p className="mb-3">{ this.state.services[this.state.serviceIndexSelected].description }</p>
                                                    <p className="text-muted text-small mb-2">Precio</p>
                                                    <p className="mb-3">$ { this.formatNumber(this.state.services[this.state.serviceIndexSelected].value) }</p>
                                                    <p className="text-muted text-small mb-2">Duración</p>
                                                    <p className="mb-3"> { this.state.services[this.state.serviceIndexSelected].duration } min.</p>
                                                    <p className="text-muted text-small mb-2">Categoría</p>
                                                    <p className="">
                                                        <a href="#">
                                                            <span className="badge badge-pill badge-outline-theme-2">{ this.state.services[this.state.serviceIndexSelected].category.name }</span>
                                                        </a>
                                                    </p>

                                                    <div className="form-group text-center col-lg-4 mx-auto mt-5">
                                                        <label htmlFor="employee_date" data-toggle="tooltip" title="Es posible modificar posteriormente." className="text-primary font-weight-bolder">SELECCIONE EMPLEADO</label>

                                                        <select name="employee_date" defaultValue={ "0" } value={ this.state.employee_id } id="employee_date" onChange={ (e) => this.setState({ employee_id: e.target.value }) } className="form-control">
                                                            <option value="0" selected>Seleccione...</option>
                                                            { this.state.services[this.state.serviceIndexSelected].employees.map((employee, index) => {
                                                                return <option value={ employee.employee_id } key={ index }>{ employee.name }</option>
                                                            }) }
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        }

                                        <button type="button" onClick={ () => this.validateForm(1) } className="btn btn-outline-primary mx-auto">SIGUIENTE <i className="simple-icon-arrow-right-circle"/></button>
                                    </form>
                                </div>
                                {/* step 2 */}
                                <div className={ this.state.step === 2 ? 'tab-pane fade show active': 'tab-pane fade' } id="second" role="tabpanel" aria-labelledby="second-tab">

                                    <div className="row">
                                        <div className="col-xl-7 col-xs-12 mb-4">
                                            <div className="card h-100">
                                                <div className="card-body text-center">
                                                    <h3 className="mb-4 text-primary"><i className="simple-icon-calendar" /> SELECCIONAR FECHA</h3>
                                                    <div className="form-group">
                                                        <div className="date-inline">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-5 col-xs-12 mb-4">
                                            <div className="card h-100">
                                                <div className="card-body text-center px-0">
                                                    <h3 className="mb-4 text-primary"><i className="simple-icon-clock" /> SELECCIONA HORA DE LA CITA</h3>

                                                    {/* dias sin atención */}
                                                    { this.state.schedule && parseInt(this.state.schedule.status) !== 1 &&
                                                        <div className="alert alert-warning">
                                                            <strong>Este día NO hay atención.</strong>
                                                        </div>
                                                    }

                                                    {/* dias con atención */}
                                                    { !this.state.schedule &&
                                                        <div>
                                                            <p className="text-muted"><i className="simple-icon-info"/> Selecciona primero la fecha de la cita...</p>
                                                        </div>
                                                    }

                                                    { this.state.schedule != null && this.state.schedule.status === 1  &&
                                                        <div>
                                                            <p><strong className="text-primary">Horario de atención el día seleccionado: </strong>
                                                                { this.formatAMPM(this.state.schedule.start_am) } a
                                                                { this.formatAMPM(this.state.schedule.end_pm) === this.formatAMPM(this.state.schedule.start_pm) ? this.formatAMPM(this.state.schedule.end_am) : this.formatAMPM(this.state.schedule.end_pm) }
                                                                </p>
                                                            <div className="btn-group-toggle justify-content-around" data-toggle="buttons">
                                                                { this.state.hours.map((hour, index) => {
                                                                    return <button onClick={ () => this.handleSelectHour(index) } key={ index } className={ this.state.selectedIndexHour.includes(index) ? "btnCheckHour btn btn-outline-primary btn-sm m-1 active": "btnCheckHour btn btn-outline-primary btn-sm m-1" }>
                                                                        <input type="checkbox" name="hours" className="check_hour" value={ index }/> { this.formatAMPM(hour.hour) }
                                                                    </button>
                                                                })}
                                                            </div>
                                                        </div>
                                                    }

                                                    {/* horario seleccionado */}
                                                    { this.state.selectedHour != null &&
                                                    <div className="col-xl-12 col-xs-12 mb-0 mt-3 bg-primary mx-0">
                                                        <div className="card justify-content-center">
                                                            <div className="card-body text-center text-white">
                                                                <h3 className="mb-4 text-primary font-weight-bolder"><i className="simple-icon-check" /> HORARIO SELECCIONADO</h3>
                                                                <p className="mb-1 text-primary"><strong>Fecha: </strong>{ this.state.schedule.day }, { this.state.selectedDay } de { this.formatMonthString(this.state.selectedMonth) }</p>
                                                                <p className="mb-1 text-primary"><strong>Hora: </strong> Desde las <strong>{ this.formatAMPM(this.state.start_date) }</strong> Hasta las <strong>{ this.formatAMPM(this.state.end_date) }</strong></p>
                                                                <p className="mb-1 text-primary"><strong>Duración: </strong> { this.state.services[this.state.serviceIndexSelected].duration } min.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-left">
                                            <button type="button" onClick={ () => this.setState({ step: this.state.step - 1 }) } className="btn btn-outline-dark mx-auto">
                                                <i className="simple-icon-arrow-left-circle"/> IR ATRAS</button>
                                        </div>
                                        { this.state.selectedHour != null &&
                                            <div className="col-6 text-right">
                                                <button type="button" onClick={() => this.validateForm(2)} className="btn btn-outline-primary mx-auto">
                                                    SIGUIENTE <i className="simple-icon-arrow-right-circle"/></button>
                                            </div>
                                        }
                                    </div>

                                </div>
                                {/* step 3 */}
                                <div className={ this.state.step === 3 ? 'tab-pane fade show active': 'tab-pane fade' } id="third" role="tabpanel" aria-labelledby="third-tab">
                                    <h3 className="mb-4 text-primary text-center"><i className="simple-icon-user" /> DATOS DEL CLIENTE</h3>
                                    <div className="row justify-content-center mb-0">
                                        <form action="#" name="form_search_client" id="form_search_client" className="col-sm-6">
                                            <label htmlFor="client_list"><i className="iconsmind-Search-People icon-md"/> Buscar cliente</label>
                                            <div className="form-group">
                                                <select value={ this.state.selectedClient } onChange={ (e) => this.handleSelectClient(e) } className="form-control select2-single" id="client_list" name="client_list">
                                                    <option key={ 99999 } value="99999">Seleccione</option>
                                                    { this.state.clients.map((client, index) => {
                                                        return <option key={ index } value={ index }>{ client.name } { client.last_name } | { client.tel } | { client.email }</option>
                                                    })}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    { this.state.selectedClient &&
                                        <div className="row justify-content-center mt-0">
                                            <button data-toggle="tooltip" title="Quitar cliente" className="btn btn-outline-primary btn-sm mx-auto"
                                                    onClick={ this.handleQuitSelectedClient }><i className="iconsmind-Close"/>
                                            </button>
                                        </div>
                                    }

                                    { this.state.selectedClient &&
                                        <div className="col-md-12 mb-4 mt-2 list">
                                            <div className="card d-flex flex-row mb-3">
                                                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                                    <div
                                                        className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                                        <span className="w-40 w-sm-100">
                                                            <p className="list-item-heading mb-1 truncate">{ this.state.selectedClient.name } { this.state.selectedClient.last_name }</p>
                                                        </span>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{ this.state.selectedClient.email }</p>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{ this.state.selectedClient.tel }</p>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{ this.state.selectedClient.notes }</p>
                                                    </div>
                                                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                                        <label className="custom-control custom-checkbox mb-0">
                                                            <input type="checkbox" checked className="custom-control-input"/>
                                                            <span className="custom-control-label"/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    { !this.state.selectedClient &&
                                        <div className="container-fluid mt-2 justify-content-center col-lg-6 ">
                                            <form className="needs-validation mb-5" noValidate>

                                                <h6 className="mb-4 text-primary text-center"><i className="iconsmind-Add-User" /> REGISTRAR NUEVO CLIENTE</h6>
                                                <p>Por favor ingrese los datos del cliente. Todos los campos son obligatorios.</p>
                                                <div className="form-row col-12">

                                                    <div className="col-md-12 mb-3">
                                                        <label htmlFor="tel"><i className="simple-icon-screen-smartphone"/> Número de Contacto</label>
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend h-100">
                                                                <div className="input-group-text">+57</div>
                                                            </div>
                                                            <input type="text" className="form-control h-100" id="tel" onChange={ (e) => this.handleChangeFormNewClient('tel', e) } value={ this.state.formNewClient.tel } placeholder="Digita tu número de contacto" required />
                                                        </div>

                                                        <div className="valid-icon" data-toggle="tooltip" data-placement="left" title="Looks good!">
                                                            <i className="simple-icon-check "/>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 mb-3">
                                                        <label htmlFor="name">Nombre Cliente</label>
                                                        <input type="text" className="form-control" onChange={ (e) => this.handleChangeFormNewClient('name', e) } value={ this.state.formNewClient.name } id="name" placeholder="Tu nombre" required />
                                                        <div className="valid-icon" data-toggle="tooltip" data-placement="left" title="Looks good!">
                                                            <i className="simple-icon-check "/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-3">
                                                        <label htmlFor="email">Correo electrónico</label>
                                                        <input type="text" className="form-control" id="email" onChange={ (e) => this.handleChangeFormNewClient('email', e) } value={ this.state.formNewClient.email } placeholder="Correo electrónico" required />
                                                    </div>

                                                    <div className="col-md-12 mb-3">
                                                        <label htmlFor="notes">Notas u observaciones
                                                            {/* <i className="iconsmind-Inbox" data-toggle="tooltip" title="Pues anotar aquí "/> */}
                                                        </label>
                                                        <textarea className="form-control" id="notes" onChange={ (e) => this.handleChangeFormNewClient('notes', e) } placeholder="Notas u Observaciones del cliente.">{ this.state.formNewClient.notes }</textarea>
                                                    </div>
                                                </div>

                                                { !this.state.formNewClient.exist && !this.state.formNewClient.exist_email &&
                                                    <div className="form-row justify-content-center">
                                                        <button className="btn btn-primary" onClick={ this.submitFormClient } type="button"><i className="iconsmind-Add-User"/> Registrar </button>
                                                    </div>
                                                }
                                                { this.state.formNewClient.exist &&
                                                    <div className="alert alert-warning">
                                                        El Número de contacto (teléfono) digitado ya esta registrado con otro cliente existente.
                                                    </div>
                                                }
                                                { this.state.formNewClient.exist_email &&
                                                    <div className="alert alert-warning">
                                                        El correo electronico digitado ya esta registrado con otro cliente existente.
                                                    </div>
                                                }

                                            </form>
                                        </div>
                                    }

                                    <div className="row">
                                        <div className="col-6 text-left">
                                            <button type="button" onClick={ () => this.setState({ step: this.state.step - 1 }) } className="btn btn-outline-dark mx-auto">
                                                <i className="simple-icon-arrow-left-circle"/> IR ATRAS</button>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button type="button" onClick={ () => this.validateForm(3) } className="btn btn-outline-primary mx-auto">
                                                SIGUIENTE <i className="simple-icon-arrow-right-circle"/></button>
                                        </div>
                                    </div>
                                </div>
                                {/* step 4 */}
                                <div className={ this.state.step === 4 ? 'tab-pane fade show active': 'tab-pane fade' } id="four" role="tabpanel" aria-labelledby="four-tab">
                                    <h3 className="mb-4 text-primary text-center"><i className="iconsmind-Check" /> CONFIRMAR LA CITA</h3>

                                    <div className="row justify-content-center">
                                        <div className="col-lg-3">
                                            { this.state.serviceIndexSelected &&
                                            <a href="#" className="card" data-toggle="tooltip" title="Servicio seleccionado">
                                                <div className="card-body text-center">
                                                    <i className="simple-icon-star icon-lg"/>
                                                    <p className="card-text font-weight-semibold mb-0 lead">{ this.state.services[this.state.serviceIndexSelected].name }</p>
                                                    <p className="text-muted text-small mb-2">Descripción:</p>
                                                    <p className="mb-3">{ this.state.services[this.state.serviceIndexSelected].description }</p>
                                                    <p className="text-muted text-small mb-2">Precio:</p>
                                                    <p className="mb-3">$ { this.formatNumber(this.state.services[this.state.serviceIndexSelected].value) }</p>
                                                    <p className="text-muted text-small mb-2">Duración:</p>
                                                    <p className="mb-3"> { this.state.services[this.state.serviceIndexSelected].duration } min.</p>
                                                    <p className="text-muted text-small mb-2">Categoría</p>
                                                    <p className="">
                                                        <a href="#">
                                                            <span className="badge badge-pill badge-outline-theme-2">{ this.state.services[this.state.serviceIndexSelected].category.name }</span>
                                                        </a>
                                                    </p>
                                                </div>
                                            </a>
                                            }
                                        </div>
                                        <div className="col-lg-3">
                                            { this.state.selectedHour != null &&
                                            <a href="#" className="card"  data-toggle="tooltip" title="Hora y fecha">
                                                <div className="card-body text-center">
                                                    <i className="iconsmind-Calendar-4 icon-lg"/>
                                                    <p className="card-text font-weight-semibold mb-0 lead">{ this.state.schedule.day }, { this.state.selectedDay } de { this.formatMonthString(this.state.selectedMonth) }</p>
                                                    <p className="text-muted text-small mb-2">Hora:</p>
                                                    <p className="mb-1">Desde las <strong>{ this.formatAMPM(this.state.start_date) }</strong> Hasta las <strong>{ this.formatAMPM(this.state.end_date) }</strong></p>
                                                </div>
                                            </a>
                                            }
                                        </div>
                                        <div className="col-lg-3">
                                            { this.state.selectedClient &&
                                            <a href="#" className="card" data-toggle="tooltip" title="Cliente">
                                                <div className="card-body text-center">
                                                    <i className="iconsmind-Checked-User icon-lg"/>
                                                    <p className="card-text font-weight-semibold mb-0 lead">{ this.state.selectedClient.name } { this.state.selectedClient.last_name }</p>
                                                    <p className="text-muted text-small mb-2">Teléfono:</p>
                                                    <p className="mb-1">{ this.state.selectedClient.email }</p>
                                                    <p className="text-muted text-small mb-2">Correo electrónico:</p>
                                                    <p className="mb-1">+57 { this.state.selectedClient.tel }</p>

                                                </div>
                                            </a>
                                            }
                                        </div>
                                    </div>

                                    <div className="row justify-content-center mt-3">
                                        <div className="col-10 text-left card p-3">

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Notas: </span>
                                                </div>
                                                <textarea style={ { maxHeight: '400px' }} name="observations" className="form-control" id="observations"
                                                          placeholder="Notas u observaciones de la cita..." onChange={ (e) => this.setState({ observations: e.target.value }) }>
                                                    { this.state.observations }</textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-left">
                                            <button type="button" onClick={ () => this.setState({ step: this.state.step - 1 }) } className="btn btn-outline-dark mx-auto">
                                                <i className="simple-icon-arrow-left-circle"/> IR ATRAS</button>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button type="button" onClick={ () => this.submitNewDate() } className="btn btn-primary mx-auto">
                                                CONFIRMAR CITA <i className="simple-icon-check"/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default NewDate;
if (document.getElementById('newDateComponent')) {
    ReactDOM.render(<NewDate />, document.getElementById('newDateComponent'));
}
