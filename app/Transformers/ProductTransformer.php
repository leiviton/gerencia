<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\Category;
use Pedidos\Models\Product;

/**
 * Class ProductTransformer
 * @package namespace Pedidos\Transformers;
 */
class ProductTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['category','subgroup'];

    /**
     * Transform the \Product entity
     * @param \Product $model
     *
     * @return array
     */
    public function transform(Product $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'description' => $model->description,
            'price' => $model->price,
            'status' => (int) $model->status,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeCategory(Product $model)
    {
        return $this->item($model->category, new CategoryTransformer());
    }

    public function includeSubgroup(Product $model)
    {
        return $this->item($model->subgroup, new SubgroupTransformer());
    }
}
