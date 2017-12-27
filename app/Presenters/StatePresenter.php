<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\StateTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class StatePresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class StatePresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new StateTransformer();
    }
}
