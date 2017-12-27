<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\AddressClient;

/**
 * Class AddressClientTransformer
 * @package namespace Pedidos\Transformers;
 */
class AddressClientTransformer extends TransformerAbstract
{

    /**
     * Transform the AddressClient entity
     * @param Pedidos\Models\AddressClient $model
     *
     * @return array
     */
    public function transform(AddressClient $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
