<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\CaixaRepository;
use Pedidos\Models\Caixa;
use Pedidos\Validators\CaixaValidator;

/**
 * Class CaixaRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class CaixaRepositoryEloquent extends BaseRepository implements CaixaRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Caixa::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
