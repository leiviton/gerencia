<?php

namespace Pedidos\Http\Controllers;

use Pedidos\Http\Requests\AdminCategoryRequest;
use Pedidos\Http\Requests\CheckoutRequest;
use Pedidos\Repositories\CategoryRepository;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\ProductRepository;
use Pedidos\Repositories\UserRepository;
use Pedidos\Services\OrderService;
use Illuminate\Http\Request;
use Pedidos\Http\Requests;
use Illuminate\Support\Facades\Auth;


class CheckoutController extends Controller
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

        $clientID = $this->userRepository->find(Auth::user()->id)->client->id;
        $orders = $this->repository->scopeQuery(function ($query)use($clientID){
            return $query->where('client_id','=',$clientID);
        })->paginate();

        return view('customer.order.index',compact('orders'));
    }

    public function create(){
        $products = $this->productRepository->listar();


        return view('customer.order.create', compact('products'));
    }

    public function store(Request $request){
        $data = $request->all();
        $clientId = $this->userRepository->find(Auth::user()->id)->client->id;
        $data['client_id'] = $clientId;
        $this->orderService->create($data);

        return redirect()->route('customer.order.index');
    }

}
