<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\AddressClient;

/**
 * Class AddressClientTransformer
 * @package namespace Pedidos\Transformers;
 */
class AddressClientTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['city'];

    /**
     * Transform the AddressClient entity
     * @param Pedidos\Models\AddressClient $model
     *
     * @return array
     */
    public function transform(AddressClient $model)
    {
        return [
            'id'         => (int) $model->id,
            'address' => $model->address,
            'complemento' => $model->complemento,
            'numero' => $model->numero,
            'bairro' => $model->bairro,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeCity(AddressClient $model)
    {
        return $this->item($model->city, new CityTransformer());
    }
}
