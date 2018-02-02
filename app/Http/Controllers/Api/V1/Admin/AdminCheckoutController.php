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
use Pedidos\Repositories\AuditRepository;
use Pedidos\Repositories\ComplementItemRepository;
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
    /**
     * @var ComplementItemRepository
     */
    private $complementItemRepository;
    /**
     * @var AuditRepository
     */
    private $auditRepository;

    public function  __construct(OrderRepository $repository, OrderService $orderService
        , ProductRepository $productRepository, MesaRepository $mesaRepository,
                                 PaymentTypesRepository $typesRepository, OrderItemRepository $itemRepository
        ,ComplementRepository $complementRepository, ComplementItemRepository $complementItemRepository,
        AuditRepository $auditRepository){
        $this->repository = $repository;
        $this->orderService = $orderService;
        $this->productRepository = $productRepository;
        $this->mesaRepository = $mesaRepository;
        $this->typesRepository = $typesRepository;
        $this->itemRepository = $itemRepository;
        $this->complementRepository = $complementRepository;
        $this->complementItemRepository = $complementItemRepository;
        $this->auditRepository = $auditRepository;
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
        $user = \Auth::guard('api')->user();
        $data = $request->all();
        $data['user_create'] = $user->email;
        $o = $this->orderService->create($data);

        $this->printer($o->id);

        if($o->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'pedido',
                'action' => 'Criou o pedido: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

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
        $user = \Auth::guard('api')->user();
        $id = (int) $request->get('order_id');
        $data['total_pago'] = $request->get('total_pago');
        $data['desconto'] = $request->get('desconto');
        $data['acrescimo'] = $request->get('acrescimo');
        $data['total_original'] = $request->get('total_original');
        $data['payment_types_id'] = $request->get('payment_types_id');
        $data['user_create'] = $user->email;
        $o = $this->orderService->pagyment($id,$data);

        if($o->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'pagamento/pedidos',
                'action' => 'Pagou o pedido: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

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

    public function excluirItem($id)
    {
        $user = \Auth::guard('api')->user();

        $result = $this->orderService->removeItem($id);

        if($result->id)
        {
            $audit = [
                'type'=>'delete',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'order_item',
                'action' => 'Removeu produtos no pedido: '.$result->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($result->id);



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
        $user = \Auth::guard('api')->user();

        $data = $request->all();
        $data['user_update'] = $user->email;
        $result = $this->orderService->addItem($data);

        if($result->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'order_item',
                'action' => 'Adicionou produtos no pedido: '.$result->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($result->id);
    }

    public function addComplent(Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();
        $data['user_update'] = $user->email;
        //return $data;
        $result = $this->orderService->addComplement($data);

        if($result->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'order_item',
                'action' => 'Adicionou complementos no item: '.$data['item_id'].' , Pedido: '.$result->id
            ];

            $this->auditRepository->create($audit);
        }
        return $this->repository->skipPresenter(false)
            ->find($result->id);
    }

    public function addHistorico($id,Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();
        $data['user_update'] = $user->email;
        $result = $this->orderService->addHistorico($data);

        if($result->id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'order_item',
                'action' => 'Adicionou observação no item: '.$data['item_id'].' , Pedido: '.$result->id
            ];

            $this->auditRepository->create($audit);
        }
        return $this->repository->skipPresenter(false)
            ->find($result->id);
    }
    public function update($id, Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();
        $data['user_update'] = $user->email;
        $this->orderService->updateStatus($data,$id);

        if($id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'Pedido',
                'action' => 'Editou o pedido: '.$id
            ];

            $this->auditRepository->create($audit);
        }

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
                $com = '';
                $id = $value->id;
                $complements = $this->complementItemRepository->scopeQuery(function($query) use($id){
                    return $query->where('order_item_id',$id);
                })->all();
                if($complements) {
                    foreach ($complements as $v) {
                        $com = "<br />" . $v->complement->name. " - R$". $v->price;
                    }
                }else{
                    $com = '';
                }

                $produtos .= " <tr class='border'>
                            <td class='fonte padding produto'>" . $value->product->name . $com . "<br/>".$value->historico."</td>
                            <td class='fonte padding produto'>" . $value->qtd . "</td>
                            <td class='fonte padding produto'> R$" . $value->price . "</td>
                            </tr>
                          ";
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
                     $produtos*
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
            $cliente = "";
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
                                    .center{
                                        position: fixed;
                                        margin-left: 200px;
                                    }
                                    .produto{
                                        font-weight: 400;
                                        font-size: 20px;
                                    }
                                    .total{
                                        font-weight: bold;
                                        font-size: 18px;
                                    }
                                    .divd{
                                        font-weight: 100;
                                        color: #3e515b;
                                        font-size: 10px;
                                    }
                                    .border{
                                         border-bottom: 1px solid #c2cfd6;;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='center'>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte produto'>Pedido: $order->id | Mesa: ".$order->mesa->name."</h5>
                                    <h5 class='fonte'>Data: $data | Hora: $hora</h5>                              
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    $cliente
                                    <h5 class='fonte'>ITENS:</h5>
                                    $table
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                    <h5 class='fonte total'>TOTAL DA COMPRA: R$ $order->total</h5>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>$order->observacao</h5>
                                    <h5 class='fonte'>$taxa</h5>
                                 </div>
                            </body>
                        </html>")->save(public_path().'/printer/'.$order->id.'.pdf');

        $order->link_printer = 'http://108.61.155.169/printer/'.$order->id.'.pdf';

        $order->save();

        return $this->repository->skipPresenter(false)->find($order->id);
    }

    public function printerClose($id)
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
                $com = '';
                $id = $value->id;
                $complements = $this->complementItemRepository->scopeQuery(function($query) use($id){
                    return $query->where('order_item_id',$id);
                })->all();
                if($complements) {
                    foreach ($complements as $v) {
                        $com = "<br />" . $v->complement->name. " - R$". $v->price;
                    }
                }else{
                    $com = '';
                }$produtos .= "<tr class='border'>
                            <td class='fonte padding produto'>" . $value->product->name . $com . "<br/>".$value->historico."</td>
                            <td class='fonte padding produto'>" . $value->qtd . "</td>
                            <td class='price padding produto'> R$" . $value->price . "</td>
                            </tr>
                            ";
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
                                    ..fonte{
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
                                    .total{
                                        font-weight: bold;
                                        font-size: 18px;
                                    }
                                    .divd{
                                        font-weight: 100;
                                        color: #3e515b;
                                        font-size: 10px;
                                    }
                                    .border{
                                         border-bottom: 1px solid #c2cfd6;;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='center'>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte produto'>Pedido: $order->id | " . $order->mesa->name . "</h5>
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
                                    <h5 class='fonte total'>TOTAL DA COMPRA: R$ $order->total</h5>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte' style='word-wrap: normal'>".substr($order->observacao,0,15)."<br/>".
                                    substr($order->observacao,15,count_chars($order->observacao))."</h5>
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
                                        word-wrap:  normal;
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
                                        font-size: 18px;
                                    }
                                    .total{
                                        font-weight: bold;
                                        font-size: 18px;
                                    }
                                    .divd{
                                        font-weight: 100;
                                        color: #3e515b;
                                        font-size: 10px;
                                    }
                                    .border{
                                         border-bottom: 1px solid #c2cfd6;;
                                    }
                                    .obs{                                                                       
                                        width: 5em; 
                                        word-wrap: break-word;
                                        font-size: 12px;
                                        font-weight: 400;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='center'>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte produto'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                    <h5 class='fonte'>Data: $data</h5>  
                                    <h5 class='fonte'>Hora: $hora</h5>                            
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>ITENS:</h5>
                                    $table
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                    <h5 class='fonte total'>TOTAL DA COMPRA: R$ $order->total</h5>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <p class='obs'>$order->observacao</p>
                                    <h5 class='fonte'>$taxa</h5>
                                 </div>
                            </body>
                        </html>")->save(public_path() . '/printer/' . $order->id . '.pdf');
        }
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
                 $com = '';
                 $id = $value->id;
                 $complements = $this->complementItemRepository->scopeQuery(function($query) use($id){
                     return $query->where('order_item_id',$id);
                 })->all();
                if($complements) {
                    foreach ($complements as $v) {
                        $com .= "<br />" . $v->complement->name. " - R$". $v->price;
                    }
                }else{
                    $com = '';
                }

                $produtos .= "<tr class='border'>
                            <td class='fonte produto border produto2'>" . $value->product->name . $com . "<br/>".$value->historico."</td>
                            <td class='fonte padding border produto'>" . $value->qtd . "</td>
                            <td class='price padding border'> R$" . $value->price . "</td>
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
                        <th class='price padding'>Vr.Uni</th>
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
                                    .produto{
                                        font-weight: 300;
                                        font-size: 18px;
                                        
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 8em;
                                    }
                                    .total{
                                        font-weight: bold;
                                        font-size: 18px;
                                    }
                                    .divd{
                                        font-weight: 100;
                                        color: #3e515b;
                                        font-size: 10px;
                                    }
                                    
                                    .border{
                                         border-bottom: 1px solid #c2cfd6;;
                                    }
                                    .obs{
                                        font-weight: bold;
                                        font-size: 16px;
                                        word-wrap: break-word;
                                        width: 16em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 10px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='center'>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte produto'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                    <h5 class='data'>Data: $data |  Hora: $hora | Previsão: ".date('H:i:s',strtotime('+ 30 minutes',strtotime($hora)))."</h5>                              
                                    
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>Cliente: " . $order->client->name . "</h5>
                                    <h5 class='fonte'>Endereço: " . $order->client->addressClient->address . "," . $order->client->addressClient->numero . "</h5>
                                    <h5 class='fonte'>Complemento: " . $order->client->addressClient->complemento . "</h5>
                                    <h5 class='fonte'>Bairro: " . $order->client->addressClient->bairro . "</h5>
                                    <h5 class='fonte'>Cidade:    Guaxupé UF: MG</h5>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>ITENS:</h5>
                                    $table
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                    <h5 class='fonte total'>TOTAL DA COMPRA: R$ $order->total</h5>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <p class='obs'>$order->observacao</p>
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
                                        font-weight: 300;
                                        font-size: 18px;
                                        
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 8em;
                                    }
                                    .total{
                                        font-weight: bold;
                                        font-size: 18px;
                                    }
                                    .divd{
                                        font-weight: 100;
                                        color: #3e515b;
                                        font-size: 10px;
                                    }
                                    
                                    .border{
                                         border-bottom: 1px solid #c2cfd6;;
                                    }
                                    .obs{
                                        font-weight: bold;
                                        font-size: 16px;
                                        word-wrap: break-word;
                                        width: 16em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 10px;
                                    }
                                </style>
                            </head>
                            <body>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte produto'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                <h5 class='data'>Data: $data | Hora: $hora | Previsão: ".date('H:i:s',strtotime('+ 20 minutes',strtotime($hora)))."</h5>                              
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>ITENS:</h5>
                                $table
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                <h5 class='fonte total'>TOTAL DA COMPRA: R$ $order->total</h5>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <p class='obs'>$order->observacao</p>
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