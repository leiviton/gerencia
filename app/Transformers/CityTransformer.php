<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\City;

/**
 * Class CityTransformer
 * @package namespace Pedidos\Transformers;
 */
class CityTransformer extends TransformerAbstract
{

    /**
     * Transform the City entity
     * @param Pedidos\Models\City $model
     *
     * @return array
     */
    public function transform(City $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
