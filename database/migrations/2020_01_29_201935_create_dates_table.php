<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('schedule_id');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('client_id');
            $table->integer('discount')->nullable();
            $table->date('date');
            $table->time('start');
            $table->time('end');
            $table->tinyInteger('status');
            $table->timestamps();

            $table->foreign('schedule_id')->references('id')->on('schedules');
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('client_id')->references('id')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dates');
    }
}
