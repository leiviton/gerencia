<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\OpenCloseCaixas;

/**
 * Class OpenCloseCaixasTransformer
 * @package namespace Pedidos\Transformers;
 */
class OpenCloseCaixasTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['caixa'];
    /**
     * Transform the OpenCloseCaixas entity
     * @param Pedidos\Models\OpenCloseCaixas $model
     *
     * @return array
     */
    public function transform(OpenCloseCaixas $model)
    {
        return [
            'id'         => (int) $model->id,
            'tipo'      => (string) $model->tipo,
            'usuario'  => (string) $model->usuario,
            'saldo' => $model->saldo,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeCaixa(OpenCloseCaixas $model)
    {
        return $this->item($model->caixa, new CaixaTransformer());
    }
}
