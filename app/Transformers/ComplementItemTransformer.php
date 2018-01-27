<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\ComplementItems;

/**
 * Class ComplementItemTransformer
 * @package namespace Pedidos\Transformers;
 */
class ComplementItemTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['complement'];
    /**
     * Transform the ComplementItens entity
     * @param Pedidos\Models\ComplementItems $model
     *
     * @return array
     */
    public function transform(ComplementItems $model)
    {
        return [
            'id'         => (int) $model->id,
            'price' => $model->price,
            'qtd' => $model->qtd,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeComplement(ComplementItems $model){
        return $this->item($model->complement, new ComplementTransformer());
    }
}
