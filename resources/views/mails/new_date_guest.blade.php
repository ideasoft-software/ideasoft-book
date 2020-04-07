@component('mail::message')
<p>Hola {{ mb_convert_case($date->client->name, MB_CASE_TITLE, 'utf-8') }} </p>

<p>Se ha solicitado una cita.</p>

<ul>
    <li><strong>Fecha:</strong> {{ $date->created_at->format('Y-m-d H:i A') }}</li>
    <li><strong>Nombre:</strong> {{ $date->client->name }}</li>
    <li><strong>Email:</strong> {{ $date->client->email }}</li>
    <li><strong></strong> #{{ str_pad($date->id, 5, '0', STR_PAD_LEFT) }}</li>
</ul>

@component('mail::button', ['url' => route('date.details_guest', $date->code)])
    Ver Detalles
@endcomponent

Gracias,
{{ config('app.name') }}
@endcomponent

