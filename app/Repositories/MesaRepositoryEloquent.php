<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Models\Mesa;
use Pedidos\Validators\MesaValidator;

/**
 * Class MesaRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class MesaRepositoryEloquent extends BaseRepository implements MesaRepository
{
    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Mesa::class;
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
        return \Pedidos\Presenters\MesaPresenter::class;
    }
}
