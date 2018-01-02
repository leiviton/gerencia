<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class ComplementItem extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'complement_id',
        'order_item_id',
        'price',
        'qtd'
    ];

    public function orderItem(){
        return $this->belongsTo(OrderItem::class);
    }

    public function complement(){
        return $this->belongsTo(Complement::class);
    }
}
