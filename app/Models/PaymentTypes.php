<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class PaymentTypes extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'type',
        'ativo'
    ];

    public function paymentOrders(){
        return $this->hasMany(PaymentOrders::class);
    }

}
