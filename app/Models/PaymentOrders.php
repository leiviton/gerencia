<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class PaymentOrders extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'total_pago',
        'desconto',
        'acrescimo',
        'total_original'
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function paymentTypes(){
        return $this->belongsTo(PaymentTypes::class);
    }
}
