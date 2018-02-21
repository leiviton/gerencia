<?php

namespace Pedidos\Transformers;

use DateTime;
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
            'saldo' => (float)$model->saldo,
            'data_caixa' => (string) date_format(new DateTime($model->data_caixa),'d/m/Y'),
            /* place your other model properties here */

            'created_at' => (string)date_format($model->created_at,'d/m/Y H:i:s'),
            'updated_at' => (string)date_format($model->updated_at,'d/m/Y H:i:s')
        ];
    }

    public function includeCaixa(OpenCloseCaixas $model)
    {
        return $this->item($model->caixa, new CaixaTransformer());
    }
}
