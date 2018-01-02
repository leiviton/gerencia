<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\ComplementRepository;
use Pedidos\Models\Complement;
use Pedidos\Validators\ComplementValidator;

/**
 * Class ComplementRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class ComplementRepositoryEloquent extends BaseRepository implements ComplementRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Complement::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
