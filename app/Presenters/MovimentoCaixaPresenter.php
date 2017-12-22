<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\MovimentoCaixaTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class MovimentoCaixaPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class MovimentoCaixaPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new MovimentoCaixaTransformer();
    }
}
