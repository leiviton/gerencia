<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 18/11/2017
 * Time: 18:05
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Illuminate\Support\Facades\App;
use Pedidos\Http\Controllers\Controller;

use Pedidos\Http\Requests\CheckoutRequest;
use Illuminate\Http\Request;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\PaymentTypesRepository;
use Pedidos\Repositories\ProductRepository;
use Pedidos\Services\OrderService;

class AdminCheckoutController extends Controller
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
    /**
     * @var PaymentTypesRepository
     */
    private $typesRepository;

    public function  __construct(OrderRepository $repository, OrderService $orderService
        , ProductRepository $productRepository, MesaRepository $mesaRepository, PaymentTypesRepository $typesRepository){
        $this->repository = $repository;
        $this->orderService = $orderService;
        $this->productRepository = $productRepository;
        $this->mesaRepository = $mesaRepository;
        $this->typesRepository = $typesRepository;
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

    public function payment(Request $request)
    {
        $id = (int) $request->get('order_id');
        $data['total_pago'] = $request->get('total_pago');
        $data['desconto'] = $request->get('desconto');
        $data['acrescimo'] = $request->get('acrescimo');
        $data['total_original'] = $request->get('total_original');
        $data['payment_types_id'] = $request->get('payment_types_id');

        $o = $this->orderService->pagyment($id,$data);

        return $this->repository
            ->skipPresenter(false)
            ->find($o->id);
    }

    public function getMesas()
    {
        $status = 3;
        $result = $this->mesaRepository->skipPresenter(false)
            ->scopeQuery(function($query) use($status){
                return $query->where('status','<',$status);
            })
            ->all();
        return $result;
    }

    public function getMesasLivre()
    {
        $status = 0;
        $result = $this->mesaRepository->skipPresenter(false)
            ->scopeQuery(function($query) use($status){
                return $query->where('status',$status);
            })
            ->all();
        return $result;
    }

    public function getTypePayments()
    {
        $ativo = 'S';
        $result = $this->typesRepository->skipPresenter(false)
            ->scopeQuery(function($query) use($ativo){
                return $query->where('ativo',$ativo);
            })
            ->all();
        return $result;
    }

    public function addItem(Request $request)
    {
        $data = $request->all();

        $result = $this->orderService->addItem($data);

        return $this->repository
            ->skipPresenter(false)
            ->find($result->id);
    }

    public function update($id, Request $request)
    {
        $data = $request->all();

        $this->orderService->updateStatus($data,$id);

        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }

    public function printer($id)
    {
        $order = $this->repository->skipPresenter(true)->find($id);

        $data = date_format($order->created_at,'d/m/Y');

        $hora = date_format($order->created_at,'H:i:s');

        $produtos = '';

        $table = '';

        foreach ($order->items as $value)
        {
            $produtos .= "<h4>$value->product->id
                                    </h4>
                          ";
        }

        $table = "<table>
                               <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Produto</th>
                                    <th>Qtd</th>
                                    <th>Valor</th>
                                    <th>SubTotal</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  $produtos
                                  </tr>
                                 </tbody>
                          </table>";
        $pdf = App::make('dompdf.wrapper');

        $pdf->loadHTML("<html>
                            <head>
                                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>
                            </head>
                            <body>
                                <h4>------------------------------------------------------</h4>
                                <h3>Pedido: $order->id</h3>
                                <h3>Data: $data</h3>
                                <h3>Hora: $hora</h3>
                                <h4>-------------------------------------------------------</h4>
                                <!--h4>Cliente: $order->client</h4>
                                <h4>Endereço: $order->client->addressClient->address ,$order->client->addressClient->numero</h4>
                                <h4>Complemento: $order->client->addressClient->complemento</h4>
                                <h4>Bairro: $order->client->addressClient->bairro</h4>
                                <h4>Cidade: Guaxupé UF: MG</h4>
                                <h4-->-------------------------------------------------------</h4>
                                <h3>Produtos:</h3>
                                $produtos
                            </body>
                        </html>")->save(public_path().'/printer/'.$order->id.'.pdf');

        $order->link_printer = '/printer/'.$order->id.'.pdf';

        $order->save();

        return $this->repository->skipPresenter(false)->find($order->id);
    }
}