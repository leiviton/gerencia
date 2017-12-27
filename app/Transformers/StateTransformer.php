<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\State;

/**
 * Class StateTransformer
 * @package namespace Pedidos\Transformers;
 */
class StateTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['country'];
    /**
     * Transform the State entity
     * @param Pedidos\Models\State $model
     *
     * @return array
     */
    public function transform(State $model)
    {
        return [
            'id'         => (int) $model->id,
            'state' => $model->state,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeCountry(State $model)
    {
        return $this->item($model->country, new CountryTransformer());
    }
}
