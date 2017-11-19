<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Subgroup;

/**
 * Class SubgroupTransformer
 * @package namespace Pedidos\Transformers;
 */
class SubgroupTransformer extends TransformerAbstract
{

    /**
     * Transform the Subgroup entity
     * @param Pedidos\Models\Subgroup $model
     *
     * @return array
     */
    public function transform(Subgroup $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
