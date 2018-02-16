<?php

namespace Pedidos\Repositories;


use Carbon\Carbon;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Models\MovimentoCaixa;
use Pedidos\Validators\MovimentoCaixaValidator;

/**
 * Class MovimentoCaixaRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class MovimentoCaixaRepositoryEloquent extends BaseRepository implements MovimentoCaixaRepository
{
    protected $skipPresenter = true;

    public function filter($data)
    {
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
        $status['caixa_id'] = $where['caixa_id'];
        $like = null;

        if(!empty($data['like']) and is_array($data['like'])){
            $like = $data['like'];

            $key = key(reset($like));
            $like[0] = $key;
            $like[1] = '%'.$like[$key].'%';
        }

        $results = [];
        $user = (string) $where['user'];

        if(strnatcasecmp($user,'todos')){
            $results = $this->model
                ->where(function ($query) use ($like) {
                    if ($like){
                        return $query->where($like[0],'like',$like[1]);
                    }
                    return $query;
                })
                ->orderBy('id','asc')
                ->whereBetween("created_at",
                    [$inicio,$fim])
                ->where('caixa_id',$status['caixa_id'])
                ->where('usuario',$where['user'])
                ->get();
        }else{
            $results = $this->model
                ->where(function ($query) use ($like) {
                    if ($like){
                        return $query->where($like[0],'like',$like[1]);
                    }
                    return $query;
                })
                ->orderBy('id','asc')
                ->whereBetween("created_at",
                    [$inicio,$fim])
                ->where('caixa_id',$status['caixa_id'])
                ->get();
        }
        if ($results){
            return $this->parserResult($results);
        }

        return $results;
    }
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MovimentoCaixa::class;
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
        return \Pedidos\Presenters\MovimentoCaixaPresenter::class;
    }

}
