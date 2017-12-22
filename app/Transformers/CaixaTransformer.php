<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Caixa;

/**
 * Class CaixaTransformer
 * @package namespace Pedidos\Transformers;
 */
class CaixaTransformer extends TransformerAbstract
{

    /**
     * Transform the Caixa entity
     * @param Pedidos\Models\Caixa $model
     *
     * @return array
     */
    public function transform(Caixa $model)
    {
        return [
            'id'         => (int) $model->id,
            'name' => $model->name,
            'salvo' => $model->saldo,
            'ativo' => $model->ativo,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
