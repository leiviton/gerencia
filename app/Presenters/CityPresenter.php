<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\CityTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CityPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class CityPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CityTransformer();
    }
}
