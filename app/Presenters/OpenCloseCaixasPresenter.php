<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\OpenCloseCaixasTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class OpenCloseCaixasPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class OpenCloseCaixasPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new OpenCloseCaixasTransformer();
    }
}
