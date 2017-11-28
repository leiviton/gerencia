<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 18/11/2017
 * Time: 18:05
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Pedidos\Http\Requests\CheckoutRequest;
use Illuminate\Http\Request;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\ProductRepository;
use Pedidos\Services\OrderService;

class AdminCheckoutController
{
    /**
     * @var OrderRepository
     */
    private $repository;
    /**
     * @var OrderService
     */
    private $orderService;
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var MesaRepository
     */
    private $mesaRepository;

    public function  __construct(OrderRepository $repository, OrderService $orderService
        , ProductRepository $productRepository, MesaRepository $mesaRepository){
        $this->repository = $repository;
        $this->orderService = $orderService;
        $this->productRepository = $productRepository;
        $this->mesaRepository = $mesaRepository;
    }

    public function store(CheckoutRequest $request){
        $data = $request->all();
        $o = $this->orderService->create($data);
        return $this->repository
            ->skipPresenter(false)
            ->find($o->id);
    }

    public function search(Request $request)
    {
        $pesquisa = $request->get('value');

        $result = $this->productRepository->skipPresenter(false)
                       ->scopeQuery(function($query) use($pesquisa){
                          return $query->where('status',0)
                                       ->where('id',$pesquisa)
                                       ->orWhere('name',$pesquisa);
                       })
                       ->all();
        return $result;
    }

    public function getMesas()
    {
        $result = $this->mesaRepository->skipPresenter(false)
                        ->all();
        return $result;
    }


}