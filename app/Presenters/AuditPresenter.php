<?php

namespace Pedidos\Presenters;

use Pedidos\Transformers\AuditTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class AuditPresenter
 *
 * @package namespace Pedidos\Presenters;
 */
class AuditPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new AuditTransformer();
    }
}
