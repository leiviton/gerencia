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

        $this->printer($o->id);

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

        $this->printer($result->id);

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
        $order = $this->repository->find($id);

        $data = date_format($order->created_at,'d/m/Y');

        $hora = date_format($order->created_at,'H:i:s');

        $produtos = '';

        $contador = 0;

        foreach ($order->items as $value)
        {
            $produtos .= " <tr>
                            <td class='fonte'>".$value->product->id."</td>
                            <td class='fonte'>".$value->product->name."</td>
                            <td class='fonte'>".$value->qtd."</td>
                            <td class='fonte'>".$value->price."</td>
                            <td class='fonte'>".$value->subtotal."</td>
                          </tr>";
            $contador++;
        }

        $table = "<table>
                    <thead>
                      <tr>
                        <th class='fonte'>#</th>
                        <th class='fonte'>Produto</th>
                        <th class='fonte'>Qtd</th>
                        <th class='fonte'>Valor</th>
                        <th class='fonte'>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                     $produtos
                    </tbody>
                  </table>";

        $pdf = App::make('dompdf.wrapper');

        $pdf->loadHTML("<html>
                            <head>
                                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>
                                <style>
                                    .fonte{
                                        font-weight: 300;
                                    }
                                </style>
                            </head>
                            <body>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>Pedido: $order->id | Mesa: ".$order->mesa->name."</h5>
                                <h5 class='fonte'>Data: $data | Hora: $hora</h5>                              
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>Cliente: ".$order->client->name."</h5>
                                <h5 class='fonte'>Endereço: ".$order->client->addressClient->address.",".$order->client->addressClient->numero."</h5>
                                <h5 class='fonte'>Complemento: ".$order->client->addressClient->complemento."</h5>
                                <h5 class='fonte'>Bairro: ".$order->client->addressClient->bairro."</h5>
                                <h5 class='fonte'>Cidade: Guaxupé UF: MG</h5>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>ITENS:</h5>
                                $table
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                <h5 class='fonte'>TOTAL DA COMPRA: $order->total</h5>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>$order->observacao</h5>
                            </body>
                        </html>")->save(public_path().'/printer/'.$order->id.'.pdf');

        $order->link_printer = 'http://108.61.155.169/printer/'.$order->id.'.pdf';

        $order->save();

        return $this->repository->skipPresenter(false)->find($order->id);
    }
}