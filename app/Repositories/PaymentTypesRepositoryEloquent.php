<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\PaymentTypesRepository;
use Pedidos\Models\PaymentTypes;
use Pedidos\Validators\PaymentTypesValidator;

/**
 * Class PaymentTypesRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class PaymentTypesRepositoryEloquent extends BaseRepository implements PaymentTypesRepository
{
    protected $skipPresenter = true;

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return PaymentTypes::class;
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
        return \Pedidos\Presenters\PaymentTypesPresenter::class;
    }
}
