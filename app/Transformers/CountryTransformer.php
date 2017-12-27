<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Country;

/**
 * Class CountryTransformer
 * @package namespace Pedidos\Transformers;
 */
class CountryTransformer extends TransformerAbstract
{

    /**
     * Transform the Country entity
     * @param Pedidos\Models\Country $model
     *
     * @return array
     */
    public function transform(Country $model)
    {
        return [
            'id'         => (int) $model->id,
            'country' => $model->country,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
