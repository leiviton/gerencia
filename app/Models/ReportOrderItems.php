<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class ReportOrderItems extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = "report_items_order";

    protected $fillable = [
        'valor',
        'hora',
        'mes',
        'produto',
        'preco',
        'pedido',
        'pagamento',
        'usuario',
        'observacao',
        'data'
    ];

}
