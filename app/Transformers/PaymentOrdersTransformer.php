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
    protected $defaultIncludes = ['type'];

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
            'order_id' => (int) $model->order_id,
            /* place your other model properties here */
            'created_at' => (string)date_format($model->created_at,'d/m/Y H:i:s'),
            'updated_at' => $model->updated_at
        ];
    }

    public function includeType(PaymentOrders $model)
    {
        return $this->item($model->paymentTypes, new PaymentTypesTransformer());
    }
}
