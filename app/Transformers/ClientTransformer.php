<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Client;

/**
 * Class ClientTransformer
 * @package namespace Pedidos\Transformers;
 */
class ClientTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['user','addressClient'];

    /**
     * Transform the \Client entity
     * @param \Client $model
     *
     * @return array
     */
    public function transform(Client $model)
    {
        return [
            'id' => (int) $model->id,
            'name' => $model->name,
            'phone'=> $model->phone,
            'address'=> $model->address,
            'city'=>$model->city,
            'state'=>$model->state,
            'zipcode'=>$model->zipcode,
            'status'=>$model->status,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeUser(Client $model){
        return $this->item($model->user, new UserTransformer());
    }

    public function includeAddressClient(Client $model)
    {
        return $this->item($model->addressClient, new AddressClientTransformer());
    }
}
