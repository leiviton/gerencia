<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\CompanyApplication;

/**
 * Class CompanyApplicationTransformer
 * @package namespace Pedidos\Transformers;
 */
class CompanyApplicationTransformer extends TransformerAbstract
{

    /**
     * Transform the CompanyApplication entity
     * @param Pedidos\Models\CompanyApplication $model
     *
     * @return array
     */
    public function transform(CompanyApplication $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
