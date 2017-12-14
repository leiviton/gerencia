<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\PaymentTypes;

/**
 * Class PaymentTypesTransformer
 * @package namespace Pedidos\Transformers;
 */
class PaymentTypesTransformer extends TransformerAbstract
{

    /**
     * Transform the PaymentTypes entity
     * @param Pedidos\Models\PaymentTypes $model
     *
     * @return array
     */
    public function transform(PaymentTypes $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
