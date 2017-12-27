<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class City extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'city'
    ];

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function addressClient()
    {
        return $this->hasMany(AddressClient::class);
    }
}
