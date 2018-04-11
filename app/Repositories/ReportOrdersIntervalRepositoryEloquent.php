<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\ReportOrdersIntervalRepository;
use Pedidos\Models\ReportOrdersInterval;
use Pedidos\Validators\ReportOrdersIntervalValidator;

/**
 * Class ReportOrdersIntervalRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class ReportOrdersIntervalRepositoryEloquent extends BaseRepository implements ReportOrdersIntervalRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ReportOrdersInterval::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
