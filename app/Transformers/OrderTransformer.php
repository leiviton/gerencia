<?php

namespace Pedidos\Transformers;

use Illuminate\Database\Eloquent\Collection;
use League\Fractal\TransformerAbstract;
use Pedidos\Models\Order;

/**
 * Class OrderTransformer
 * @package namespace Pedidos\Transformers;
 */
class OrderTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['cupom'];
    protected $defaultIncludes = ['client','items','mesa','payment'];

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Order $model)
    {
        $previsao = date_format($model->created_at,'H:i:s');
        return [
            'id'         => (int) $model->id,
            'total'      => (float) $model->total,
            'product_names'    => $this->getArrayProductNames($model->items),
            'status'=>$model->status,
            'type' => (int) $model->type,
            'hash'=>$model->hash,
            'created_at' => (string)date_format($model->created_at,'d/m/Y H:i:s'),
            'previsao' => (string) date('H:i:s',strtotime('+ 20 minutes',strtotime($previsao))),
            'updated_at' => $model->updated_at
        ];
    }

    protected function getArrayProductNames(Collection $items){
        $names = [];
        foreach ($items as $item){
            $names[] = $item->product->name;
        }
        return $names;
    }

    public function includeClient(Order $model){
        return $this->item($model->client, new ClientTransformer());
    }

    public function includeCupom(Order $model){
        if (!$model->cupom){
            return null;
        }
            return $this->item($model->cupom, new CupomTransformer());
    }
    public function includeItems(Order $model){
        return $this->collection($model->items,new OrderItemTransformer());
    }
    public function includeMesa(Order $model){
        return $this->collection($model->mesa,new MesaTransformer());
    }

    public function includePayment(Order $model){
        return $this->collection($model->paymentOrders,new PaymentOrdersTransformer());
    }
}
