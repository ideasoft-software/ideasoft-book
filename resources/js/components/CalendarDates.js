import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Calendar} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import Tooltip from "bootstrap/js/src/tooltip";

import * as CalendarToday from 'tui-calendar';
//import "tui-calendar/dist/tui-calendar.css";

class CalendarDates extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            events: [],
        }
    }
    componentDidMount() {
        //this.getData();
        var date = new Date();
        var month_today = date.getMonth() + 1;
        var day_today = date.getDate();
        month_today = month_today < 10 ? '0' + month_today : month_today;
        day_today = day_today < 10 ? '0' + day_today : day_today;
        var date_f = date.getFullYear() + '' + month_today + '' + day_today;
        var date_today = day_today + '-' + month_today + '-' + date.getFullYear();

        var calendarEl = document.getElementById('calendarDayGrid');
        var calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
            defaultView: 'timeGridWeek',
            displayEventEnd: true,
            locale: 'es',
            timeZone: 'America/Bogota',
            buttonText: {
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                list: "Lista"
            },
            nowIndicator: true,
            defaultDate: date.getFullYear() + "-" + month_today + '-' + day_today,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            eventRender: function (info) {
                var tooltip = new Tooltip(info.el, {
                    title: info.event.extendedProps.description,
                    placement: 'top',
                    trigger: 'hover',
                    container: 'body'
                });
            },
            eventClick: function (info) {
                var eventObj = info.event;
                if (eventObj.url) {
                    window.open(eventObj.url);
                    info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
                }
            },
            events: {
                url: '/agenda',
                method: 'POST',
                extraParams: {
                    '_token': $('meta[name="csrf-token"]').attr('content'),
                },
                failure: function () {
                    notify("top", "center", "danger", "Error", "Ocurrió un error cargando las citas. Intente de nuevo");
                },
                timeFormat: "H(:mm)t"
            }
        });
        calendar.setOption('locale', 'es');
        calendar.render();

        /*var calendarToday = new CalendarToday('#calendar_today', {

            // 'day', 'week', 'month'
            defaultView: 'month',
            // shows the milestone and task in weekly, daily view
            taskView: true,
            // shows the all day and time grid in weekly, daily view
            scheduleView: true,
            // template options
            template: {
                milestone: function(schedule) {
                    return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
                },
                milestoneTitle: function() {
                    return 'Milestone';
                },
                task: function(schedule) {
                    return '&nbsp;&nbsp;#' + schedule.title;
                },
                taskTitle: function() {
                    return '<label><input type="checkbox" />Task</label>';
                },
                allday: function(schedule) {
                    return schedule.title + ' <i class="fa fa-refresh"></i>';
                },
                alldayTitle: function() {
                    return 'All Day';
                },
                time: function(schedule) {
                    return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
                }
            },
            week: {
                daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                startDayOfWeek: 0,
                narrowWeekend: true
            },
            month: {
                daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                startDayOfWeek: 0,
                narrowWeekend: true
            },
            // list of Calendars that can be used to add new schedule
            calendars: [],
            // whether use default creation popup or not
            useCreationPopup: false,
            // whether use default detail popup or not
            useDetailPopup: false
        });
        calendarToday.createSchedules([
            {
                id: '1',
                calendarId: '1',
                title: 'my schedule',
                category: 'time',
                dueDateClass: '',
                start: '2020-04-06T22:30:00+09:00',
                end: '2020-04-06T02:30:00+09:00'
            },
            {
                id: '2',
                calendarId: '1',
                title: 'second schedule',
                category: 'time',
                dueDateClass: '',
                start: '2020-04-06T17:30:00+09:00',
                end: '2020-04-06T17:31:00+09:00',
            }
        ]);
        calendarToday.on('beforeCreateSchedule', function(event) {
            var startTime = event.start;
            var endTime = event.end;
            var isAllDay = event.isAllDay;
            var guide = event.guide;
            var triggerEventName = event.triggerEventName;
            var schedule;

            if (triggerEventName === 'click') {
                // open writing simple schedule popup
                schedule = {};
            } else if (triggerEventName === 'dblclick') {
                // open writing detail schedule popup
                schedule = {};
            }

            calendarToday.createSchedules([schedule]);
        });*/

    }
    async getData() {
        const URL = "/agenda";
        const response = await axios.post(URL);
        const data = response.data;
        this.setState({
            events: data.events
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
    render() {
        return (
            <div className="container-fluid disable-text-selection">
                <div className="col-lg-12 mx-auto col-xs-12 mb-4">
                    <div className="card ">
                        <div className="card-header">
                        </div>

                        <div className="card-body">
                            <div id="calendarDayGrid"/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default CalendarDates;
if (document.getElementById('calendarDates')) {
    ReactDOM.render(<CalendarDates/>, document.getElementById('calendarDates'));
}
