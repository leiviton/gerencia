<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Complement;

/**
 * Class ComplementTransformer
 * @package namespace Pedidos\Transformers;
 */
class ComplementTransformer extends TransformerAbstract
{

    /**
     * Transform the Complement entity
     * @param Pedidos\Models\Complement $model
     *
     * @return array
     */
    public function transform(Complement $model)
    {
        return [
            'id'         => (int) $model->id,
            'name' => $model->name,
            'price' => (float)$model->price,
            'ativo' => $model->ativo,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
