<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 17/08/2016
 * Time: 15:26
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Pedidos\Http\Controllers\Controller;
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

    public function __construct(MesaRepository $repository, UserService $service,OrderRepository $orderRepository)
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

    public function store(Request $request)
    {
        $data = $request->all();

        $result = $this->repository->create($data);

        return $this->repository->skipPresenter(false)->find($result->id);

    }

    public function edit($id)
    {
        return $this->repository->skipPresenter(false)->find($id);
    }

    public function update($id,Request $request)
    {
        $data = $request->all();

        $result = $this->repository->update($data,$id);

        return $this->repository->skipPresenter(false)->find($result->id);
    }
}