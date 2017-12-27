<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Client extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'address',
        'city',
        'state',
        'zipcode'
    ];

    public function user(){
        return $this->hasOne(User::class,'id','user_id');
    }

    public function addressClient()
    {
        return $this->belongsTo(AddressClient::class);
    }
}
