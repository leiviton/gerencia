<?php

namespace Pedidos\Http\Controllers\Api\V1\Deliveryman;

use Illuminate\Http\Request;
use Pedidos\Http\Controllers\Controller;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\ProductRepository;
use Pedidos\Repositories\UserRepository;
use Pedidos\Services\OrderService;


class DeliverymanCheckoutController extends Controller
{
    /**
     * @var OrderRepository
     */
    private $repository;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var OrderService
     */
    private $orderService;
    /**
     * @var ProductRepository
     */
    private $productRepository;

    public function  __construct(
        OrderRepository $repository,
        UserRepository $userRepository,
        OrderService $orderService,
        ProductRepository $productRepository
    )
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
        $this->productRepository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        //$user = \Auth::guard('api')->user();
        $orders = $this->repository
            ->skipPresenter(false)
            ->ordersOpen(3);
        return $orders;
    }

    public function getOrderFiltros(Request $request)
    {
        return $this->repository->skipPresenter(false)
            ->orderFilter($request->all());
    }
    public function getProducts(){
        $products = $this->productRepository
            ->skipPresenter(false)
            ->all();
        return $products;
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function authenticated(){
        $user = \Auth::guard('api')->user();
        return $this->userRepository->skipPresenter(false)->find($user->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = $this->repository->skippresenter(false)->find($id);
        return $order;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

