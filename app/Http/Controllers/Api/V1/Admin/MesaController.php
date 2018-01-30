<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 17/08/2016
 * Time: 15:26
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Pedidos\Http\Controllers\Controller;
use Pedidos\Repositories\AuditRepository;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\UserRepository;
use Illuminate\Http\Request;
use Pedidos\Services\UserService;

class MesaController extends Controller
{
    /**
     * @var UserRepository
     */
    private $repository;
    /**
     * @var UserService
     */
    private $service;
    /**
     * @var OrderRepository
     */
    private $orderRepository;

    public function __construct(MesaRepository $repository, UserService $service,
                                OrderRepository $orderRepository, AuditRepository $auditRepository)
    {
        $this->repository = $repository;
        $this->service = $service;
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $status = 3;
        $result = $this->orderRepository->skipPresenter(false)
            ->scopeQuery(function($query) use($status){
                return $query->where('status','<',$status)->where('type',1);
            })
            ->all();
        return $result;
    }

    public function all()
    {
        $status = 3;
        $result = $this->repository->skipPresenter(false)
            ->scopeQuery(function($query) use($status){
                return $query->where('status','<',$status);
            })
            ->all();
        return $result;
    }
    public function store(Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $result = $this->repository->create($data);

        if($result->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'mesas',
                'action' => 'Inseriou a mesa: '.$result->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository->skipPresenter(false)->find($result->id);

    }

    public function edit($id)
    {
        return $this->repository->skipPresenter(false)->find($id);
    }

    public function update($id,Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $result = $this->repository->update($data,$id);

        if($result->id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'mesas',
                'action' => 'Atualizou a mesa: '.$result->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository->skipPresenter(false)->find($result->id);
    }
}