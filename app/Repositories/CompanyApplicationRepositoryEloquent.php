<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\CompanyApplicationRepository;
use Pedidos\Models\CompanyApplication;
use Pedidos\Validators\CompanyApplicationValidator;

/**
 * Class CompanyApplicationRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class CompanyApplicationRepositoryEloquent extends BaseRepository implements CompanyApplicationRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return CompanyApplication::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
