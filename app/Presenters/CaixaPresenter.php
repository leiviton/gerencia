<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\CaixaTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CaixaPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class CaixaPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CaixaTransformer();
    }
}
