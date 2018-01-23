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
use Pedidos\Repositories\ComplementRepository;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Repositories\OrderItemRepository;
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
    /**
     * @var OrderItemRepository
     */
    private $itemRepository;
    /**
     * @var ComplementRepository
     */
    private $complementRepository;

    public function  __construct(OrderRepository $repository, OrderService $orderService
        , ProductRepository $productRepository, MesaRepository $mesaRepository,
                                 PaymentTypesRepository $typesRepository, OrderItemRepository $itemRepository
        ,ComplementRepository $complementRepository){
        $this->repository = $repository;
        $this->orderService = $orderService;
        $this->productRepository = $productRepository;
        $this->mesaRepository = $mesaRepository;
        $this->typesRepository = $typesRepository;
        $this->itemRepository = $itemRepository;
        $this->complementRepository = $complementRepository;
    }

    public function orders(Request $request)
    {

        $status = $request->get('status');
        return $this->repository->skipPresenter(false)
            ->scopeQuery(function($query) use($status){
                return $query->where('status',$status);
            })
            ->all();
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
                                       ->where('id',$pesquisa);
                       })
                       ->all();

        if(count($result['data']) == 0)
        {
            $result = $this->productRepository->skipPresenter(false)
                ->scopeQuery(function($query) use($pesquisa){
                    $like = '%'.$pesquisa.'%';
                    return $query->where('status',0)
                        ->where('id',$pesquisa)
                        ->orWhere('name','like',$like);
                })
                ->all();
        }
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

    public function printerNewItem($id)
    {
        $order = $this->repository->find($id);

        $data = date_format($order->created_at, 'd/m/Y');

        $hora = date_format($order->created_at, 'H:i:s');

        $items = $this->itemRepository
            ->scopeQuery(function ($query) use ($id) {
                return $query->where('order_id', $id)->where('impresso', 'N');
            })->all();

        $produtos = '';

        $contador = 0;

        $taxa = '';

        foreach ($items as $value) {
            if ($value->product->id != 58) {
                $produtos .= " <tr>
                            <td class='fonte padding produto'>" . $value->product->name . " - " . $value->historico . "</td>
                            <td class='fonte padding produto'>" . $value->qtd . "</td>
                            <td class='fonte padding produto'> R$" . $value->price . "</td>
                          </tr>";
                $this->itemRepository->update(['impresso' => 'S'], $value->id);
                $contador += $value->qtd;
            }

            if ($value->product->id == 58) {
                $taxa = 'Taxa de entrega: R$ ' . $value->product->price;
            }
        }

        $table = "<table>
                    <thead>
                      <tr>
                        <th class='fonte padding produto'>Produto</th>
                        <th class='fonte padding produto'>Qtd</th>
                        <th class='fonte padding produto'>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                     $produtos
                    </tbody>
                  </table>";

        $pdf = App::make('dompdf.wrapper');

        if ($order->type != 1)
        {
            $cliente = "<h5 class='fonte'>Cliente: ".$order->client->name."</h5>
                                <h5 class='fonte'>Endereço: ".$order->client->addressClient->address.",".$order->client->addressClient->numero."</h5>
                                <h5 class='fonte'>Complemento: ".$order->client->addressClient->complemento."</h5>
                                <h5 class='fonte'>Bairro: ".$order->client->addressClient->bairro."</h5>
                                <h5 class='fonte'>Cidade: Guaxupé UF: MG</h5>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                ";
        }else{
            $cliente = "<h5 class='fonte'>---------------------------------------------------------------------</h5>";
        }
        $pdf->loadHTML("<html>
                            <head>
                                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>
                                <style>
                                    .fonte{
                                        font-weight: 300;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: 400;
                                        font-size: 20px;
                                    }
                                </style>
                            </head>
                            <body>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>Pedido: $order->id | Mesa: ".$order->mesa->name."</h5>
                                <h5 class='fonte'>Data: $data | Hora: $hora</h5>                              
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                $cliente
                                <h5 class='fonte'>ITENS:</h5>
                                $table
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                <h5 class='fonte'>TOTAL DA COMPRA: R$ $order->total</h5>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>$order->observacao</h5>
                                <h5 class='fonte'>$taxa</h5>
                            </body>
                        </html>")->save(public_path().'/printer/'.$order->id.'.pdf');

        $order->link_printer = 'http://108.61.155.169/printer/'.$order->id.'.pdf';

        $order->save();

        return $this->repository->skipPresenter(false)->find($order->id);
    }

    public function printer($id)
    {
        $order = $this->repository->find($id);

        $data = date_format($order->created_at,'d/m/Y');

        $hora = date_format($order->created_at,'H:i:s');

        $items = $this->itemRepository
                        ->scopeQuery(function($query) use($id){
                            return $query->where('order_id',$id);
                        })->all();

        $produtos = '';

        $contador = 0;

        $taxa = '';

        foreach ($items as $value)
        {
            if($value->product->id != 58) {
                $produtos .= " <tr>
                            <td class='fonte padding produto' style='white-space: initial; width: 40px'>" . substr($value->product->name,0,30)." - <br />" . $value->historico . "</td>
                            <td class='fonte padding produto'>" . $value->qtd . "</td>
                            <td class='fonte padding produto'> R$" . $value->price . "</td>
                          </tr>";
                $this->itemRepository->update(['impresso' => 'S'], $value->id);
                $contador += $value->qtd;
            }

            if($value->product->id == 58){
                $taxa = 'Taxa de entrega: R$'.$value->product->price ;
            }
        }

        $table = "<table>
                    <thead>
                      <tr>
                        <th class='fonte padding produto'>Produto</th>
                        <th class='fonte padding produto'>Qtd</th>                     
                        <th class='fonte padding produto'>Vr.Uni</th>
                      </tr>
                    </thead>
                    <tbody>
                     $produtos
                    </tbody>
                  </table>";

        $pdf = App::make('dompdf.wrapper');

        if($order->type != 1) {
            $pdf->loadHTML("<html>
                            <head>
                                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>
                                <style>
                                    .fonte{
                                        font-weight: 300;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .center{
                                        position: fixed;
                                        margin-left: 200px;
                                    }
                                    .produto{
                                        font-weight: 400;
                                        font-size: 20px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='center'>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                    <h5 class='fonte'>Data: $data | Hora: $hora</h5>                              
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>Cliente: " . $order->client->name . "</h5>
                                    <h5 class='fonte'>Endereço: " . $order->client->addressClient->address . "," . $order->client->addressClient->numero . "</h5>
                                    <h5 class='fonte'>Complemento: " . $order->client->addressClient->complemento . "</h5>
                                    <h5 class='fonte'>Bairro: " . $order->client->addressClient->bairro . "</h5>
                                    <h5 class='fonte'>Cidade: Guaxupé UF: MG</h5>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>ITENS:</h5>
                                    $table
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                    <h5 class='fonte'>TOTAL DA COMPRA: R$ $order->total</h5>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>$order->observacao</h5>
                                    <h5 class='fonte'>$order->troco</h5>
                                    <h5 class='fonte'>$taxa</h5>
                                </div>
                            </body>
                        </html>")->save(public_path() . '/printer/' . $order->id . '.pdf');
        }else{
            $pdf->loadHTML("<html>
                            <head>
                                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>
                                <style>
                                    .fonte{
                                        font-weight: 300;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: 400;
                                        font-size: 20px;
                                    }
                                </style>
                            </head>
                            <body>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                <h5 class='fonte'>Data: $data | Hora: $hora</h5>                              
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>ITENS:</h5>
                                $table
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                <h5 class='fonte'>TOTAL DA COMPRA: R$ $order->total</h5>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>$order->observacao</h5>
                                <h5 class='fonte'>$taxa</h5>
                            </body>
                        </html>")->save(public_path() . '/printer/' . $order->id . '.pdf');
        }
        $order->link_printer = 'http://108.61.155.169/printer/'.$order->id.'.pdf';

        $order->save();

        return $this->repository->skipPresenter(false)->find($order->id);
    }

    public function getComplements()
    {
        return $this->complementRepository->skipPresenter(false)->all();
    }

    public function getComplement($id)
    {
        return $this->complementRepository->skipPresenter(false)->find($id);
    }


}