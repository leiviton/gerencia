<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\AddressClientRepository;
use Pedidos\Models\AddressClient;
use Pedidos\Validators\AddressClientValidator;

/**
 * Class AddressClientRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class AddressClientRepositoryEloquent extends BaseRepository implements AddressClientRepository
{
    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return AddressClient::class;
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
        return \Pedidos\Presenters\AddressClientPresenter::class;
    }
}
