<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\SubgroupRepository;
use Pedidos\Models\Subgroup;
use Pedidos\Validators\SubgroupValidator;

/**
 * Class SubgroupRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class SubgroupRepositoryEloquent extends BaseRepository implements SubgroupRepository
{
    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Subgroup::class;
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
        return \Pedidos\Presenters\SubgroupPresenter::class;
    }
}
