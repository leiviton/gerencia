<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\MesaTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class MesaPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class MesaPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new MesaTransformer();
    }
}
