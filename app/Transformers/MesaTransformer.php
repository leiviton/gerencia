<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Mesa;

/**
 * Class MesaTransformer
 * @package namespace Pedidos\Transformers;
 */
class MesaTransformer extends TransformerAbstract
{

    /**
     * Transform the Mesa entity
     * @param Pedidos\Models\Mesa $model
     *
     * @return array
     */
    public function transform(Mesa $model)
    {
        return [
            'id'         => (int) $model->id,
            'name' => $model->name,
            'description' => $model->description,
            'status' => $model->status,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
