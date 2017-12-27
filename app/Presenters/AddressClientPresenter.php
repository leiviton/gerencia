<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\AddressClientTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class AddressClientPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class AddressClientPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new AddressClientTransformer();
    }
}
