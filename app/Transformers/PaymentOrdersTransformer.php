<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\PaymentOrders;

/**
 * Class PaymentOrdersTransformer
 * @package namespace Pedidos\Transformers;
 */
class PaymentOrdersTransformer extends TransformerAbstract
{

    /**
     * Transform the PaymentOrders entity
     * @param Pedidos\Models\PaymentOrders $model
     *
     * @return array
     */
    public function transform(PaymentOrders $model)
    {
        return [
            'id'         => (int) $model->id,
            'total_pago' => (float) $model->total_pago,
            'desconto' => (float) $model->desconto,
            'acrescimo' => (float) $model->acrescimo,
            'total_original' => (float) $model->total_original,
            /* place your other model properties here */
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
