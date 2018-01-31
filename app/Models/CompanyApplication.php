<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class CompanyApplication extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [];

}
