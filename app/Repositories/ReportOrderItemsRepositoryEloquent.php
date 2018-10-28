<?php

namespace Pedidos\Repositories;

use Pedidos\Models\ReportOrderItems;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Validators\ReportOrdersIntervalValidator;

/**
 * Class ReportOrdersItemsRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class ReportOrderItemsRepositoryEloquent extends BaseRepository implements ReportOrderItemsRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ReportOrderItems::class;
    }
    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
