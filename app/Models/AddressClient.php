<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class AddressClient extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'address',
        'complemento',
        'numero',
        'bairro',
        'city_id'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function client()
    {
        return $this->hasMany(Client::class);
    }

}
