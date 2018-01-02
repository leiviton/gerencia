<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\ComplementItemTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ComplementItensPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class ComplementItensPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ComplementItemTransformer();
    }
}
