<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\ClientRepository;
use Pedidos\Models\Client;
use Pedidos\Validators\ClientValidator;

/**
 * Class ClientRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class ClientRepositoryEloquent extends BaseRepository implements ClientRepository
{
    protected $skipPresenter = true;

    public function search($value)
    {
        $result = $this->model
                ->where('id',$value)
                ->orWhere('name',$value)
                ->orWhere('phone',$value)
                ->first();
        if ($result){
            return $this->parserResult($result);
        }
        return $result;
    }
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Client::class;
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
        return \Pedidos\Presenters\ClientPresenter::class;
    }
}
