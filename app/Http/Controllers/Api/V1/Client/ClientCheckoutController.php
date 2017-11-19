<?php

namespace Pedidos\Http\Controllers\Api\V1\Client;

use Pedidos\Http\Controllers\Controller;
use Pedidos\Http\Requests\CheckoutRequest;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\ProductRepository;
use Pedidos\Repositories\UserRepository;
use Pedidos\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;


class ClientCheckoutController extends Controller
{

    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var OrderService
     */
    private $orderService;

    private $with = ['client','cupom','items'];
    public function  __construct(
        OrderRepository $repository,
        ProductRepository $productRepository,
        UserRepository $userRepository,
        OrderService $orderService
    )
    {
        $this->repository = $repository;
        $this->productRepository = $productRepository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $clientID = $this->userRepository->find($id)->client->id;
        $orders = $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function ($query)use($clientID){
            return $query->where('client_id','=',$clientID);
        })->paginate();

        return $orders;
    }

    public function store(CheckoutRequest $request){
        $data = $request->all();
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $data['client_id'] = $clientId;
        $o = $this->orderService->create($data);
        return $this->repository
                ->skipPresenter(false)
                ->with($this->with)
                ->find($o->id);
    }

    public function show($id){
        return $this->repository
            ->skipPresenter(false)
            ->with($this->with)
            ->find($id);
    }
}
