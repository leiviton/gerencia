<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\SubgroupTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class SubgroupPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class SubgroupPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new SubgroupTransformer();
    }
}
