<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 13:15
 */

namespace Pedidos\Http\Controllers;


use Illuminate\Http\Request;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\UserRepository;

class OrdersController extends Controller
{
    /**
     * @var OrderRepository
     */
    private $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(){
        $orders = $this->repository->paginate();

        return view('admin.orders.index',compact('orders'));
    }

    public function edit($id, UserRepository $userRepository){
        $list_status = [0=>'Pendente',1=>'Iniciada',2=>'Finalizada'];
        $order = $this->repository->find($id);
        $deliveryman = $userRepository->getDeliverymen();
        return view('admin.orders.edit',compact('order','list_status','deliveryman'));
    }

    public function update(Request $request, $id){
        $data = $request->all();
        $this->repository->update($data,$id);

        return redirect()->route('admin.orders.index');
    }
}