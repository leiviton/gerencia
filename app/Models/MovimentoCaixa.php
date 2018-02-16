<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class MovimentoCaixa extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'movimento_caixas';

    protected $fillable = [
        'tipo_movimento',
        'valor',
        'usuario',
        'historico',
        'payment_order_id',
        'caixa_id'
    ];

    public function caixa()
    {
        return $this->belongsTo(Caixa::class);
    }

    public function payment()
    {
        return $this->belongsTo(PaymentOrders::class,'payment_order_id','id');
    }
}
