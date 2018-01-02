<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\ComplementTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ComplementPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class ComplementPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ComplementTransformer();
    }
}
