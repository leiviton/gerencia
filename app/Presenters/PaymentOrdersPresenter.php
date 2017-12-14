<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\PaymentOrdersTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class PaymentOrdersPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class PaymentOrdersPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new PaymentOrdersTransformer();
    }
}
