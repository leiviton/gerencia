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
        'total_original',
        'payment_types_id',
        'order_id'
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function paymentTypes(){
        return $this->belongsTo(PaymentTypes::class);
    }
}
