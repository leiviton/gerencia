<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Models\MovimentoCaixa;
use Pedidos\Validators\MovimentoCaixaValidator;

/**
 * Class MovimentoCaixaRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class MovimentoCaixaRepositoryEloquent extends BaseRepository implements MovimentoCaixaRepository
{
    protected $skipCriteria = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MovimentoCaixa::class;
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
        return \Pedidos\Presenters\MovimentoCaixaPresenter::class;
    }

}
