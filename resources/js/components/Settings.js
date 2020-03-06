import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Settings extends Component{
    constructor(props){
        super(props);
        this.formatTime = this.formatTime.bind(this);
        this.submitFormSchedule = this.submitFormSchedule.bind(this);
        this.handleChangeSchedule = this.handleChangeSchedule.bind(this);
        this.handleChangeRestPeriod = this.handleChangeRestPeriod.bind(this);
        this.handleChangeNewRestPeriod = this.handleChangeNewRestPeriod.bind(this);
        this.submitFormNewRestPeriod = this.submitFormNewRestPeriod.bind(this);
        this.submitRestPeriod = this.submitRestPeriod.bind(this);
        this.deleteRestPeriod = this.deleteRestPeriod.bind(this);
        this.state= {
            days: [],
            restPeriods: [],
            timeOut: '',
            formNewRestPeriod: {
                start: null,
                end: null,
                schedule_id: '0'
            },
            formSettingsGeneral: {
                name: null,
                web: null,
                tel: null,
                location: null
            },
            dataGeneralSettings: {
                roles: [],
                permissions: []
            },
            timeList: ['7:00','']
        };
    }
    componentDidMount(){
        this.getData();
    };
    async getData () {
        const URL= window.location+'/getData';
        const response = await axios.post(URL);
        const data= response.data;
        console.log(data);
        this.setState({
            days: data.schedule,
            restPeriods: data.rest_periods,
            dataGeneralSettings: {
                roles: data.roles,
                permissions: data.permissions
            }
        });
    };
    formatTime(time) {
        let hour= time.split(':');
        let h= hour[0];
        let m= hour[1];
        if (h < 24 && m < 60){
            return h +':' +m;
        }else{
            return '00:00';
        }
    };
    handleChangeSchedule(field, id, e){
        const days = this.state.days;
        if (field === 'start'){
            days[id].start = this.formatTime(e.target.value);
        }else if(field === 'end'){
            days[id].end = this.formatTime(e.target.value);
        }else{
            let status= e.target.checked ? 1 : 0;
            days[id].status = status;
        }
        this.setState({
            days: days
        });
    };
    handleChangeRestPeriod(field, id, e){
        const restPeriods = this.state.restPeriods;
        if (field === 'start'){
            restPeriods[id].start = this.formatTime(e.target.value);
        }else if(field === 'end'){
            restPeriods[id].end = this.formatTime(e.target.value);
        }
        this.setState({
            restPeriods: restPeriods
        });
    };
    handleChangeGeneral(field, e){
        const settings = this.state.formSettingsGeneral;
        if (field === 'name'){
            settings.name = e.target.value;
        }else if(field === 'tel'){
            settings.tel = e.target.value;
        }else if(field === 'web'){
            settings.web = e.target.value;
        }else if(field === 'location'){
            settings.location = e.target.value;
        }
        this.setState({
            formSettingsGeneral: settings
        });
    };
    handleChangeNewRestPeriod(field, e){
        const form = this.state.formNewRestPeriod;
        if (field === 'start'){
            form.start = this.formatTime(e.target.value);
        }else if(field === 'end'){
            form.end = this.formatTime(e.target.value);
        }else{
            form.schedule_id = e.target.value;
        }
        this.setState({
            formNewRestPeriod: form
        });
    };
    async submitFormSchedule () {
        $(".messageSuccess1").hide('fast');
        const URL= window.location+'/saveSchedule';
        const response = await axios.post(URL, { days: this.state.days });
        const data= response.data;
        if (data === 'success') {
            $(".messageSuccess1").show('slow');
        }
    };
    async submitFormNewRestPeriod () {
        $(".messageSuccess3").hide('fast');
        $(".messageError3").hide('fast');
        if (this.state.formNewRestPeriod.start === null
            || this.state.formNewRestPeriod.end === null
            || this.state.formNewRestPeriod.schedule_id === null
            || this.state.formNewRestPeriod.schedule_id === '0'){
            $(".messageError3").show('slow');
            $("#messageError3").html("Todos los campos son necesarios.");
            return false;
        }

        const URL= window.location+'/createNewRestPeriod';
        const response = await axios.post(URL, this.state.formNewRestPeriod );
        const data= response.data;
        if (data === 'success') {
            const restPeriods= this.state.restPeriods;
            restPeriods.push({
                start:  this.state.formNewRestPeriod.start,
                end:  this.state.formNewRestPeriod.end,
                schedule_id: this.state.formNewRestPeriod.schedule_id,
                schedule: {
                    day: this.state.days[this.state.formNewRestPeriod.schedule_id-1].day
                }
            });
            this.setState({
                restPeriods: restPeriods,
                start: '00:00',
                end: '00:00',
                schedule_id: '0'
            });
            $(".messageSuccess3").show('slow');
        }else if (data === 'duplicate'){
            $(".messageError3").show('slow');
            $("#messageError3").html("Ya existe un periodo de descanso con los mismo datos.");
        }else{
            $(".messageError3").show('slow');
            $("#messageError3").html("Error! Intenta nuevamente.");
        }
    };
    async submitRestPeriod () {
        const divSuccess= $(".messageSuccess2");
        const divError= $(".messageError2");
        const message= $("#messageError2");
        divSuccess.hide('fast');
        divError.hide('fast');
        const URL= window.location+'/saveRestPeriod';
        const response = await axios.post(URL, { periods: this.state.restPeriods });
        const data= response.data;
        if (data === 'success') {
            divSuccess.show('slow');
        }else{
            divError.show('slow');
            message.html("Error! Intenta nuevamente.");
        }
    };
    async deleteRestPeriod (id) {
        const divSuccess= $(".messageSuccess2");
        const divError= $(".messageError2");
        const message= $("#messageError2");
        divSuccess.hide('fast');
        divError.hide('fast');
        const URL= window.location+'/deleteRestPeriod';
        const response = await axios.post(URL, id);
        const data= response.data;
        if (data === 'success') {
            divSuccess.show('slow');
        }else{
            divError.show('slow');
            message.html("Error! Intenta nuevamente.");
        }
    };
    render () {
        return (
            <div className="container-fluid disable-text-selection">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-2 ">
                            <h1>Ajustes</h1>
                            <div className="float-sm-right text-zero">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    {/* tabs */}
                    <div className="card-header pl-0 pr-0">
                        <ul className="nav nav-tabs card-header-tabs ml-0 mr-0" role="tablist">
                            <li className="nav-item w-20 text-center">
                                <a className="nav-link active" id="first-tab_" data-toggle="tab" href="#generalTab" role="tab" aria-controls="first" aria-selected="true">
                                    General
                                </a>
                            </li>
                            <li className="nav-item w-20 text-center">
                                <a className="nav-link" id="second-tab_" data-toggle="tab" href="#logicaNegocioTab" role="tab" aria-controls="second" aria-selected="false">
                                    Lógica del negocio
                                </a>
                            </li>
                            <li className="nav-item w-20 text-center">
                                <a className="nav-link" id="third_tab" data-toggle="tab" href="#rolesTab" role="tab" aria-controls="third" aria-selected="false">
                                    Roles y permisos
                                </a>
                            </li>
                            <li className="nav-item w-20 text-center">
                                <a className="nav-link" id="second-tab_" data-toggle="tab" href="#secondFull" role="tab"
                                   aria-controls="second" aria-selected="false">
                                    Acerca de
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="card-body">
                        <div className="tab-content">

                            {/* tab ajustes generales */}
                            <div className="tab-pane fade active show" id="generalTab" role="tabpanel" aria-labelledby="first-tab_">
                                <h6 className="mb-4 text-primary">AJUSTES GENERALES</h6>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                                    consequuntur
                                    delectus, dignissimos distinctio dolor exercitationem fugit harum hic ipsum
                                    itaque labore mollitia natus, quis, repudiandae sit velit vitae voluptatem
                                    voluptates.</p>

                                    <div className="row col-lg-10 mx-auto">

                                        <div className="col-lg-6 col-xs-12">
                                            <div className="form-group">
                                                <label>Nombre de la Empresa</label>
                                                <input type="text" value={ this.state.formSettingsGeneral.name } onChange={ (e) => this.handleChangeGeneral('name', e) } className="form-control"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Web Empresa</label>
                                                <input type="text" value={ this.state.formSettingsGeneral.web } onChange={ (e) => this.handleChangeGeneral('web', e) } className="form-control"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Teléfono Empresa</label>
                                                <input type="text" value={ this.state.formSettingsGeneral.tel } onChange={ (e) => this.handleChangeGeneral('tel', e) } className="form-control"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Ubicación Empresa</label>
                                                <input type="text"  value={ this.state.formSettingsGeneral.location }  onChange={ (e) => this.handleChangeGeneral('location', e) } className="form-control"/>
                                            </div>

                                            {/*
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox mb-3">
                                                    <input type="checkbox"
                                                           checked
                                                           onChange={ null }
                                                           className="custom-control-input"/>
                                                    <label className="custom-control-label" htmlFor={ "captcha_Status" } > Habilitar Verificación CAPTCHA</label>
                                                </div>
                                            </div>
                                            */}

                                        </div>

                                        <div className="col-lg-6 col-xs-12">
                                            <div className="form-group">
                                                <label>Dirección:</label>
                                                <input type="ad" className="form-control"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Correo Empresarial</label>
                                                <input type="email" className="form-control"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Formato de Fecha</label>
                                                <select value="1" defaultValue="1" onChange={ null } className="form-control">
                                                    <option value="1" selected>DD/MM/AAAA</option>
                                                    <option value="2">DD/MM/AA</option>
                                                    <option value="3">AAAA/MM/DD</option>
                                                    <option value="4">AA/MM/DD</option>
                                                </select>
                                            </div>


                                        </div>

                                    </div>

                                <button type="button" className="btn btn-sm btn-outline-primary">GUARDAR DATOS</button>
                            </div>

                            {/* tab lógica de negocio */}
                            <div className="tab-pane fade show" id="logicaNegocioTab" role="tabpanel" aria-labelledby="second-tab">
                                <div className="text-center">
                                    <h1 className="mb-4 text-primary">LÓGICA DEL NEGOCIO</h1>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 col-xs-12">
                                        <h1 className="mb-4 text-primary">HORARIO LABORAL</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                                            consequuntur
                                            delectus, dignissimos distinctio dolor exercitationem fugit harum hic ipsum
                                            itaque labore mollitia natus, quis, repudiandae sit velit vitae voluptatem
                                            voluptates.</p>

                                        <div className="col-12">
                                            <form action="#" method="post">

                                                <div className="card d-flex flex-row mb-3 bg-primary">
                                                    <div className="d-flex flex-grow-1 min-width-zero">
                                                        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                            <span className="list-item-heading mb-1 truncate w-40 w-xs-100">
                                                                <strong><i className="simple-icon-calendar"/> DÍA</strong>
                                                            </span>
                                                            <div className="mb-1 w-25 w-xs-100 text-center"><strong>
                                                                <i className="simple-icon-clock"/> INICIO</strong>
                                                            </div>
                                                            <span className="mb-1 w-25 w-xs-100 text-center"><strong>
                                                                <i className="simple-icon-clock"/> FIN</strong>
                                                            </span>
                                                            <span className="mb-1 w-25 w-xs-100 text-center"><strong>
                                                                <i className="iconsmind-On-off"/> ESTADO</strong>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                { this.state.days.map((day, index) => {
                                                    return <div className="card d-flex flex-row mb-3" key={ index }>
                                                        <div className="d-flex flex-grow-1 min-width-zero">
                                                            <div
                                                                className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                                <span className="list-item-heading mb-1 truncate w-25 w-xs-100 text-primary">
                                                                    <strong>{ day.day.toUpperCase() }</strong>
                                                                </span>
                                                                <div className="mb-1 text-muted text-small w-25 w-xs-100">
                                                                    <div className="form-group">
                                                                        <input type="time"
                                                                           value={ this.formatTime(this.state.days[index].start) }
                                                                           onChange={ (e) => this.handleChangeSchedule('start', index, e)}
                                                                           name={ "start_"+day.id }
                                                                           className="form-control input-small"/>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-1 text-muted text-small w-25 w-xs-100">
                                                                    <div className="form-group">
                                                                        <input type="time"
                                                                               value={ this.formatTime(this.state.days[index].end) }
                                                                               onChange={(e) => this.handleChangeSchedule('end', index, e)}
                                                                               name={ "end_"+day.id }
                                                                               className="form-control"/>
                                                                    </div>
                                                                </div>
                                                                <div className="w-15 w-xs-100" align="center">
                                                                    <div className="custom-control custom-checkbox mb-3">
                                                                        <input type="checkbox"
                                                                           checked={ this.state.days[index].status ? 'checked': '' }
                                                                           onChange={(e) => this.handleChangeSchedule('status', index, e)}
                                                                           name={ "status"+day.id }
                                                                           id={ "status"+day.id }
                                                                           className="custom-control-input"/>
                                                                        <label className="custom-control-label" htmlFor={ "status"+day.id } ><span className="d-lg-none d-md-none"> Estado</span></label>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                                <div className="form-group text-center">
                                                    <div className="alert alert-success mx-3 alert-dismissible fade show rounded messageSuccess1" style={{ display: 'none'}} role="alert">
                                                        <strong>Correcto!</strong> Datos Guardados.
                                                        <button type="button" className="close" data-dismiss="alert"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>

                                                    <button type="button" onClick={ this.submitFormSchedule } className="btn btn-sm btn-outline-primary font-weight-bolder">
                                                        <i className="iconsmind-Save"/> GUARDAR CAMBIOS
                                                    </button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-xs-12">
                                        <h1 className="mb-4 text-primary text-center">PERIODOS DE DESCANSO
                                            <button type="button" className="ml-2 btn btn-primary btn-sm" data-toggle="modal" data-target="#modalNewRestPeriod">
                                                <i className="simple-icon-plus text-lg" data-toggle="tooltip" title="Agregar Nuevo"/>
                                            </button>
                                        </h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                                            consequuntur
                                            delectus, dignissimos distinctio dolor exercitationem fugit harum hic ipsum
                                            itaque labore mollitia natus, quis, repudiandae sit velit vitae voluptatem
                                            voluptates.</p>


                                        <div className="col-12">
                                            <form action="" method="post">

                                                <div className="card d-flex flex-row mb-3 bg-primary">
                                                    <div className="d-flex flex-grow-1 min-width-zero">
                                                        <div
                                                            className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                                <span className="list-item-heading mb-1 truncate w-40 w-xs-100">
                                                                    <strong><i className="simple-icon-calendar"/> DÍA</strong>
                                                                </span>
                                                            <p className="mb-1 w-15 w-xs-100"><strong><i className="simple-icon-clock"/> INICIO</strong></p>
                                                            <p className="mb-1 w-15 w-xs-100"><strong><i className="simple-icon-clock"/> FIN</strong></p>
                                                            <p className="mb-1 w-15 w-xs-100"><strong><i className="simple-icon-check"/> ACCIONES</strong></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {this.state.restPeriods.map((period, index) => {
                                                    return <div className="card d-flex flex-row mb-3" key={ index }>
                                                        <div className="d-flex flex-grow-1 min-width-zero">
                                                            <div
                                                                className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                                <span className="list-item-heading mb-1 truncate w-15 w-xs-100 text-primary">
                                                                    <strong>{ period.schedule.day.toUpperCase() }</strong>
                                                                </span>
                                                                <div className="mb-1 text-muted text-small w-30 w-xs-100">
                                                                    <div className="form-group">
                                                                        <input type="time"
                                                                               value={ this.formatTime(this.state.restPeriods[index].start) }
                                                                               onChange={(e) => this.handleChangeRestPeriod('start', index, e)}
                                                                               name={ "break1_"+period.id }
                                                                               className="form-control"/>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-1 text-muted text-small w-30 w-xs-100">
                                                                    <div className="form-group">
                                                                        <input type="time"
                                                                               value={ this.formatTime(this.state.restPeriods[index].end) }
                                                                               onChange={(e) => this.handleChangeRestPeriod('end', index, e)}
                                                                               name={ "break2_"+period.id }
                                                                               className="form-control"/>
                                                                    </div>
                                                                </div>
                                                                <div className="w-15 w-xs-100" align="center">
                                                                    <div className="btn-group  mb-1" role="group" aria-label="Third group">
                                                                        <button type="button" onClick={ () => this.deleteRestPeriod(period.id) } className="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="Eliminar">
                                                                            <i className="iconsmind-Eraser-2"/>
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}

                                                <div className="alert alert-success mx-3 alert-dismissible fade show rounded messageSuccess2" style={{ display: 'none'}} role="alert">
                                                    <strong>Correcto!</strong>
                                                    <button type="button" className="close" data-dismiss="alert"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div className="alert alert-danger mx-3 alert-dismissible fade show rounded messageError2" style={{ display: 'none'}} role="alert">
                                                    <div id="messageError2"/>
                                                    <button type="button" className="close" data-dismiss="alert"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>

                                                <div className="form-group text-center">
                                                    <button type="button" onClick={ this.submitRestPeriod } className="btn btn-sm btn-outline-primary font-weight-bolder">
                                                        <i className="iconsmind-Save"/> GUARDAR CAMBIOS
                                                    </button>
                                                </div>

                                            </form>
                                        </div>

                                    </div>


                                    <div className="col-lg-6 mt-5 col-xs-12">
                                        <h1 className="mb-4 text-primary text-center">TIEMPOS MUERTOS</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                                            consequuntur
                                            delectus, dignissimos distinctio dolor exercitationem fugit harum hic ipsum
                                            itaque labore mollitia natus, quis, repudiandae sit velit vitae voluptatem
                                            voluptates.</p>


                                        <div className="col-12">
                                            <form action="" method="post">

                                                <div className="card d-flex flex-row mb-3">
                                                    <div className="d-flex flex-grow-1 min-width-zero">
                                                        <div
                                                            className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                                <span className="list-item-heading mb-1 truncate w-40 w-xs-100">
                                                                    <strong><i className="simple-icon-clock"/> TIEMPO EN MINUTOS</strong>
                                                                </span>
                                                            <div className="mb-1 text-muted text-small w-25 w-xs-100">
                                                                <div className="form-group">
                                                                    <input type="number" value={ this.state.timeOut } onChange={ (e) => { this.setState({ timeOut: e.target.value }) } } name="timeOut" id="timeOut" className="form-control"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group text-center">
                                                    <button type="button" className="btn btn-sm btn-outline-primary font-weight-bolder">
                                                        <i className="iconsmind-Save"/> GUARDAR CAMBIOS
                                                    </button>
                                                </div>

                                            </form>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* tab roles y permisos */}
                            <div className="tab-pane fade show" id="rolesTab" role="tabpanel" aria-labelledby="third_tab">
                                <div className="text-center">
                                    <h1 className="mb-4 text-primary">ROLES Y PERMISOS</h1>
                                </div>

                                <div className="row">
                                    <div className="col-lg-8 col-xs-12 mx-auto">

                                        <div className="card d-flex flex-row mb-3 bg-primary">
                                            <div className="d-flex flex-grow-1 min-width-zero">
                                                <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                    <span className="list-item-heading mb-1 truncate w-40 w-xs-100 text-center">
                                                        <strong><i className="iconsmind-Books"/> PERMISO</strong>
                                                    </span>
                                                    { this.state.dataGeneralSettings &&
                                                        this.state.dataGeneralSettings.roles.map((rol, index) => {
                                                            return <span key={ index } className="list-item-heading mb-1 truncate w-40 w-xs-100 text-center">
                                                                <strong> { rol.name.toUpperCase() }</strong>
                                                            </span>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        { this.state.dataGeneralSettings &&
                                            this.state.dataGeneralSettings.permissions.map((permission, index) => {
                                                return <div key={ index } className="card d-flex flex-row mb-3 bg-light">
                                                    <div className="d-flex flex-grow-1 min-width-zero">
                                                        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                            <span className="list-item-heading mb-1 truncate w-40 w-xs-100 text-center">
                                                                <strong>{ permission.name.toUpperCase() }</strong>
                                                            </span>

                                                            { this.state.dataGeneralSettings.roles.map((role, index) => {
                                                                { this.state.dataGeneralSettings.roles.map((role, index) => {
                                                                    return <span key={ index } className="list-item-heading mb-1 truncate w-40 w-xs-100 text-center">
                                                                        <div className="custom-control custom-checkbox mb-3">
                                                                            <input type="checkbox" checked onChange={ null } className="custom-control-input"/>
                                                                            <label className="custom-control-label" htmlFor={"captcha_Status"}> </label>
                                                                        </div>
                                                                    </span>
                                                                })}
                                                            })}

                                                            {/*
                                                             <span className="list-item-heading mb-1 truncate w-40 w-xs-100 text-center">
                                                                <div className="custom-control custom-checkbox mb-3">
                                                                    <input type="checkbox" checked onChange={null} className="custom-control-input"/>
                                                                    <label className="custom-control-label" htmlFor={"captcha_Status"}> </label>
                                                                </div>
                                                            </span>
                                                            */}
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal nuevo rest_period */}
                <div className="modal fade modal-right show" id="modalNewRestPeriod" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalRight" style={{ display: 'none', paddingRight: '19px' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary pb-0">
                                <h5 className="modal-title">Crear nuevo periodo de descanso</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="formNewRestPeriod" name="formNewRestPeriod">
                                    <div className="form-group">
                                        <label>Hora Inicio</label>
                                        <input type="time"
                                           value={ this.state.formNewRestPeriod.start }
                                           onChange={(e) => this.handleChangeNewRestPeriod('start', e)}
                                           name={ "rest_start" }
                                           className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Hora Fin</label>
                                        <input type="time"
                                               value={ this.state.formNewRestPeriod.end }
                                               onChange={(e) => this.handleChangeNewRestPeriod('end', e)}
                                               name={ "rest_end" }
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Día</label>
                                        <select className="form-control" defaultValue='0' name={ "rest_schedule_id" } onChange={ (e) => this.handleChangeNewRestPeriod('schedule_id', e) }>
                                            <option disabled selected value='0'>Seleccione</option>
                                            { this.state.days.map((day, index) => {
                                                return <option key={ index } value={ day.id }>{ day.day }</option>
                                            })}
                                        </select>
                                    </div>
                                </form>

                                <div className="alert alert-success mx-3 alert-dismissible fade show rounded messageSuccess3" style={{ display: 'none'}} role="alert">
                                    <strong>Correcto!</strong> Datos Guardados.
                                    <button type="button" className="close" data-dismiss="alert"
                                            aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="alert alert-danger mx-3 alert-dismissible fade show rounded messageError3" style={{ display: 'none'}} role="alert">
                                    <div id="messageError3"/>
                                    <button type="button" className="close" data-dismiss="alert"
                                            aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                                <button type="button" onClick={ this.submitFormNewRestPeriod } className="btn btn-primary">CREAR</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Settings;
if (document.getElementById('setting')) {
    ReactDOM.render(<Settings />, document.getElementById('setting'));
}
