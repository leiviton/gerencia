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
            'saldo' => $model->saldo,
            'ativo' => $model->ativo,

            /* place your other model properties here */

            'created_at' => (string)date_format($model->created_at,'d/m/Y H:i:s'),
            'updated_at' => (string)date_format($model->updated_at,'d/m/Y H:i:s')
        ];
    }

}
