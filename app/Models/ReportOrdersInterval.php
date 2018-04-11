<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class ReportOrdersInterval extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = "report_orders_types_payments";

    protected $fillable = [
        'valor',
        'desconto',
        'acrescimo',
        'total',
        'ativo',
        'pedido',
        'pago_agora',
        'cliente_id',
        'cliente',
        'tipo_id',
        'tipo',
        'observacao',
        'data',
        'status'
    ];

}
