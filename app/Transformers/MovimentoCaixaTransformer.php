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

    protected $defaultIncludes = ['caixa','payment'];
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
            'valor'=>(float) $model->valor,
            'usuario'=>$model->usuario,
            'historico'=>$model->historico,
            /* place your other model properties here */
            'created_at' => (string)date_format($model->created_at,'d/m/Y H:i:s'),
            'updated_at' => (string)date_format($model->updated_at,'d/m/Y H:i:s')
        ];
    }

    public function includeCaixa(MovimentoCaixa $model)
    {
        return $this->item($model->caixa,new CaixaTransformer());
    }

    public function includePayment(MovimentoCaixa $model)
    {
        if(!$model->payment){
            return null;
        }else{
            return $this->item($model->payment, new PaymentOrdersTransformer());
        }

    }

}
