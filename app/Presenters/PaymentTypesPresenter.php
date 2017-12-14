<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\PaymentTypesTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class PaymentTypesPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class PaymentTypesPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new PaymentTypesTransformer();
    }
}
