<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\MovimentoCaixa;

/**
 * Class MovimentoCaixaTransformer
 * @package namespace Pedidos\Transformers;
 */
class MovimentoCaixaTransformer extends TransformerAbstract
{

    /**
     * Transform the MovimentoCaixa entity
     * @param Pedidos\Models\MovimentoCaixa $model
     *
     * @return array
     */
    public function transform(MovimentoCaixa $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
