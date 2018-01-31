<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\CompanyApplicationTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CompanyApplicationPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class CompanyApplicationPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CompanyApplicationTransformer();
    }
}
