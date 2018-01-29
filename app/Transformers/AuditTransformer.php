<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Audit;

/**
 * Class AuditTransformer
 * @package namespace Pedidos\Transformers;
 */
class AuditTransformer extends TransformerAbstract
{

    /**
     * Transform the Audit entity
     * @param Pedidos\Models\Audit $model
     *
     * @return array
     */
    public function transform(Audit $model)
    {
        return [
            'id'         => (int) $model->id,
            'type'      => $model->type,
            'user'      => $model->user,
            'entity'    => $model->entity,
            'action'    => $model->action,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeUser(Audit $model)
    {
        if (!$model->user) {
            return null;
        } else {
            return $this->item($model->user, new UserTransformer());
        }
    }
}
