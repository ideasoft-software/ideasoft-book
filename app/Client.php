<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    const ACTIVE= 1;
    const INACTIVE= 0;
    protected $table= "clients";

}
