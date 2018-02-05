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

    protected $defaultIncludes = ['caixa', 'payment'];
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
            'tipo_movimento' => $model->tipo_movimento,
            'valor'=>$model->valor,
            'usuario'=>$model->usuario,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeCaixa(MovimentoCaixa $model)
    {
        return $this->item($model->caixa,new CaixaTransformer());
    }

    public function includePayment(MovimentoCaixa $model)
    {
        if($model->payment) {
            return $this->item($model->payment, new PaymentOrdersTransformer());
        }else{
            return null;
        }
    }

}
