<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\PaymentOrdersRepository;
use Pedidos\Models\PaymentOrders;
use Pedidos\Validators\PaymentOrdersValidator;

/**
 * Class PaymentOrdersRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class PaymentOrdersRepositoryEloquent extends BaseRepository implements PaymentOrdersRepository
{

    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return PaymentOrders::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return \Pedidos\Presenters\PaymentOrdersPresenter::class;
    }
}
