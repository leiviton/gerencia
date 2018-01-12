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

    public function __construct(MesaRepository $repository, UserService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index()
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
        $data = $request->all();

        $result = $this->service->create($data);

        return $this->repository->skipPresenter(false)->find($result->id);

    }

    public function edit($id)
    {
        return $this->repository->skipPresenter(false)->find($id);
    }

    public function update($id,Request $request)
    {
        $data = $request->all();

        $result = $this->service->update($data,$id);

        return $this->repository->skipPresenter(false)->find($result->id);
    }
}