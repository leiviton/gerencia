<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\CountryTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CountryPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class CountryPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CountryTransformer();
    }
}
