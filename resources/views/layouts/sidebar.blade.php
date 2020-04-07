<div class="sidebar">
    <div class="main-menu">
        <div class="scroll">
            <ul class="list-unstyled">
                <li class="active">
                    <a href="{{ route('home') }}">
                        <i class="iconsmind-Home"></i><span>Inicio</span>
                    </a>
                </li>
                <li>
                    <a href="#agenda">
                        <i class="iconsmind-Calendar-4"></i> Agenda
                    </a>
                </li>
                <li>
                    <a href="#services">
                        <i class="simple-icon-star"></i> Servicios
                    </a>
                </li>
                <li>
                    <a href="#clientes">
                        <i class="iconsmind-Business-Mens"></i> Clientes
                    </a>
                </li>
                @can('change_settings')
                <li>
                    <a href="#users_sidebar" class="text-center">
                        <i class="iconsmind-User"></i> Usuarios y</br>Personal
                    </a>
                </li>
                @endcan
                @can('change_settings')
                <li>
                    <a href="{{ route('settings.index') }}">
                        <i class="iconsmind-Gear"></i> Ajustes
                    </a>
                </li>
                @endcan
            </ul>
        </div>
    </div>
    <div class="sub-menu">
        <div class="scroll">
            <ul class="list-unstyled" data-link="agenda">
                <li class="active">
                    <a href="{{ route('agenda') }}">
                        <i class="simple-icon-calendar"></i> Ver Agenda
                    </a>
                </li>
                <li>
                    <a href="{{ route('agenda.new_date') }}">
                        <i class="simple-icon-event"></i> Programar Nueva Cita
                    </a>
                </li>
                <li>
                    <a href="{{ route('agenda.index') }}">
                        <i class="iconsmind-Bulleted-List"></i> Listado Citas
                    </a>
                </li>
            </ul>

            <ul class="list-unstyled" data-link="clientes">
                <li>
                    <a href="{{ route('clients.index') }}">
                        <i class="iconsmind-Mens"></i> Lista de Clientes
                    </a>
                </li>
                <li>
                    <a href="Layouts.Thumbs.html">
                        <i class="iconsmind-Add-User"></i> Nuevo Cliente
                    </a>
                </li>
            </ul>

            <ul class="list-unstyled" data-link="services">
                <li>
                    <a href="{{ route('services.index') }}">
                        <i class="simple-icon-star"></i> Ver Servicios
                    </a>
                </li>
                <li>
                    <a href="{{ route('services.create') }}">
                        <i class="simple-icon-plus"></i> Nuevo Servicio
                    </a>
                </li>
                <li>
                    <a href="{{ route('categories.index') }}">
                        <i class="simple-icon-grid"></i> Administrar Categorias
                    </a>
                </li>
            </ul>

            <ul class="list-unstyled" data-link="users_sidebar">
                <li>
                    <a href="{{ route('users.index') }}">
                        <i class="iconsmind-Mens"></i> Lista de Usuarios
                    </a>
                </li>
                <li>
                    <a href="{{ route('users.create') }}">
                        <i class="iconsmind-Add-User"></i> Nuevo Usuario
                    </a>
                </li>
                <li>
                    <a href="{{ route('employees.index') }}">
                        <i class="iconsmind-Business-ManWoman"></i> Listado de Personal
                    </a>
                </li>
                <li>
                    <a href="{{ route('employees.create') }}">
                        <i class="iconsmind-Add-User"></i> Nuevo Empleado
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
