<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\StateRepository;
use Pedidos\Models\State;
use Pedidos\Validators\StateValidator;

/**
 * Class StateRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class StateRepositoryEloquent extends BaseRepository implements StateRepository
{
    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return State::class;
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
        return \Pedidos\Presenters\StatePresenter::class;
    }
}
