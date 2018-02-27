<?php

namespace Pedidos\Repositories;

use Carbon\Carbon;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\OpenCloseCaixasRepository;
use Pedidos\Models\OpenCloseCaixas;
use Pedidos\Validators\OpenCloseCaixasValidator;

/**
 * Class OpenCloseCaixasRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class OpenCloseCaixasRepositoryEloquent extends BaseRepository implements OpenCloseCaixasRepository
{
    protected $skipPresenter = true;

    public function countF($tipo)
    {
        return $this->model->where('data_caixa','>=',Carbon::now()->startOfDay())->where('tipo',$tipo)->count();
    }
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return OpenCloseCaixas::class;
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
        return \Pedidos\Presenters\OpenCloseCaixasPresenter::class;
    }
}
