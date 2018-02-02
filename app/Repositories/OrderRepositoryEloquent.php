<?php

namespace Pedidos\Repositories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Models\Order;
use Pedidos\Validators\OrderValidator;

/**
 * Class OrderRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{
    protected $skipPresenter = true;

    public function orderFilter($data)
    {
        $order = $data['order'] ?? null;
        if($order !== null){
            $order = explode(',',$order);
        }
        $order[0] = $order[0] ?? 'id';
        $order[1] = $order[1] ?? 'asc';

        $where = $data['where'] ?? [];
        $inicio = null;
        $fim = null;
        if (isset($where['inicio'])){
            $inicio = $where['inicio']." 00:00:00";
        }else{
            $inicio = new Carbon('2010-01-01 00:00:00');
        }

        if(isset($where['fim'])){
            $fim = $where['fim']." 23:59:59";
        }else{
            $fim = Carbon::now();
        }
        $status['status'] = $where['status'];
        $like = null;

        if(!empty($data['like']) and is_array($data['like'])){
            $like = $data['like'];

            $key = key(reset($like));
            $like[0] = $key;
            $like[1] = '%'.$like[$key].'%';
        }
        $results = $this->model
                    ->orderBy($order[0],$order[1])
                    ->where(function ($query) use ($like) {
                        if ($like){
                            return $query->where($like[0],'like',$like[1]);
                        }
                        return $query;
                    })
                    ->whereBetween("created_at",
                        [$inicio,$fim])
                    ->where($status)
                    ->get();
                if ($results){
                    return $this->parserResult($results);
                }

        return $results;
    }
    public function ordersOpen($status=3){

        $result = $this->model->whereRaw('(status < ? or status = ?)',[$status,4])->get();

        if ($result){
            return $this->parserResult($result);
        }
        throw (new ModelNotFoundException())->setModel(get_class($this->model));
    }

    public function getOrders()
    {
        $result = $this->model
            ->get();
        if ($result){
            return $this->parserResult($result);
        }
        throw (new ModelNotFoundException())->setModel(get_class($this->model));
    }
    public function getByIdAndDeliveryman($id,$idDeliveryman){
        $result = $this->model
            ->first();
        if ($result){
            return $this->parserResult($result);
        }
        throw (new ModelNotFoundException())->setModel(get_class($this->model));
    }
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Order::class;
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
        return \Pedidos\Presenters\OrderPresenter::class;
    }

}
