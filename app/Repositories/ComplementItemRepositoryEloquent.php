<?php

namespace Pedidos\Repositories;

use Pedidos\Models\ComplementItem;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Validators\ComplementItensValidator;

/**
 * Class ComplementItensRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class ComplementItemRepositoryEloquent extends BaseRepository implements ComplementItemRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ComplementItem::class;
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
        return \Pedidos\Presenters\ComplementItensPresenter::class;
    }
}
