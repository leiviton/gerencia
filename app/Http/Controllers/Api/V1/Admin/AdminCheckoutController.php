<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 18/11/2017
 * Time: 18:05
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Pedidos\Http\Controllers\Controller;

use Pedidos\Http\Requests\CheckoutRequest;
use Illuminate\Http\Request;
use Pedidos\Repositories\AuditRepository;
use Pedidos\Repositories\CaixaRepository;
use Pedidos\Repositories\ComplementItemRepository;
use Pedidos\Repositories\ComplementRepository;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Repositories\OpenCloseCaixasRepository;
use Pedidos\Repositories\OrderItemRepository;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\PaymentTypesRepository;
use Pedidos\Repositories\ProductRepository;
use Pedidos\Services\OrderService;
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;


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
    /**
     * @var CaixaRepository
     */
    private $caixaRepository;
    /**
     * @var OpenCloseCaixasRepository
     */
    private $openCloseCaixasRepository;

    public function  __construct(OrderRepository $repository, OrderService $orderService
        , ProductRepository $productRepository, MesaRepository $mesaRepository,
                                 PaymentTypesRepository $typesRepository, OrderItemRepository $itemRepository
        ,ComplementRepository $complementRepository, ComplementItemRepository $complementItemRepository,
        AuditRepository $auditRepository,CaixaRepository $caixaRepository, OpenCloseCaixasRepository $openCloseCaixasRepository){
        $this->repository = $repository;
        $this->orderService = $orderService;
        $this->productRepository = $productRepository;
        $this->mesaRepository = $mesaRepository;
        $this->typesRepository = $typesRepository;
        $this->itemRepository = $itemRepository;
        $this->complementRepository = $complementRepository;
        $this->complementItemRepository = $complementItemRepository;
        $this->auditRepository = $auditRepository;
        $this->caixaRepository = $caixaRepository;
        $this->openCloseCaixasRepository = $openCloseCaixasRepository;
    }

    public function orders(Request $request)
    {

        $status = $request->get('status');
        return $this->repository->skipPresenter(false)
            ->scopeQuery(function($query) use($status){
                return $query->where('status',$status)->where('created_at','>=',Carbon::now()->startOfDay());
            })
            ->all();
    }

    public function reportOrders(Request $request)
    {
        $data = $request->get('data');
        $o = $this->orderService->report($data);
        return response()->json($o);
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

    public function contadores(Request $request)
    {
        if ($request->get('status'))
        {
            return $this->repository->contarStatus($request->get('status'));
        }else if ($request->get('type'))
        {
            return $this->repository->contarType($request->get('type'));
        }else if($request->get('close'))
        {
            return $this->repository->contarClose($request->get('close'));
        }else if($request->get('local'))
        {
            return $this->repository->contarLocal($request->get('local'));
        }
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
                        //->where('id',$pesquisa)
                        ->where('name','like',$like);
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
        $caixa = $this->caixaRepository->find(1);

        $open = $this->openCloseCaixasRepository->findWhere(['data_caixa'=>date('Y-m-d'),'tipo'=>'F']);

        $open_a = $this->openCloseCaixasRepository->findWhere(['data_caixa'=>date('Y-m-d'),'tipo'=>'A']);

        if($data['payment_types_id'] == 1) {
            if($caixa->open_close == 'F' && count($open_a) == 0){
                return response()->json('fechado');
            }elseif ($caixa->open_close == 'F' && count($open) > 0) {
                return response()->json('fechado');
            } else {
                if ($data['total_pago'] == 0) {
                    return 0;
                } else {
                    $o = $this->orderService->pagyment($id, $data);

                    if ($o->id) {
                        $audit = [
                            'type' => 'insert',
                            'user_id' => $user->id,
                            'user' => $user->email,
                            'entity' => 'pagamento/pedidos',
                            'action' => 'Pagou o pedido: ' . $o->id
                        ];

                        $this->auditRepository->create($audit);
                    }

                    return $this->repository
                        ->skipPresenter(false)
                        ->find($o->id);
                }
            }
        }else{
            if ($data['total_pago'] == 0) {
                return 0;
            } else {
                $o = $this->orderService->pagyment($id, $data);

                if ($o->id) {
                    $audit = [
                        'type' => 'insert',
                        'user_id' => $user->id,
                        'user' => $user->email,
                        'entity' => 'pagamento/pedidos',
                        'action' => 'Pagou o pedido: ' . $o->id
                    ];

                    $this->auditRepository->create($audit);
                }

                return $this->repository
                    ->skipPresenter(false)
                    ->find($o->id);
            }
        }
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

    public function openOrder(Request $request)
    {
        $data = $request->get('order_id');

        $result = $this->orderService->openOrder($data);

        return $this->repository
            ->skipPresenter(false)
            ->find($result->id);
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

    public function cancelOrder($id,Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();
        $data['user_update'] = $user->email;
        $this->orderService->cancel($data,$id);

        if($id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'Pedido',
                'action' => 'Cancelou o pedido: '.$id.' - Motivo:'.$data['motivo_cancelamento']
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

        $data = date_format($order->created_at,'d/m/Y');

        $hora = date_format($order->created_at,'H:i:s');

        $items = $this->itemRepository
            ->scopeQuery(function($query) use($id){
                return $query->where('order_id',$id)->where('impresso','N');
            })->all();

        $produtos = '';

        $contador = 0;

        $taxa = '';

        foreach ($items as $value)
        {
            if($value->product->id != 58 && $value->ativo != 'N') {
                $com = '';
                $id = $value->id;
                $complements = $this->complementItemRepository->scopeQuery(function($query) use($id){
                    return $query->where('order_item_id',$id);
                })->all();
                if($complements) {
                    foreach ($complements as $v) {
                        $com .= "<br />" . $v->complement->name. " - $". $v->price;
                    }
                }else{
                    $com = '';
                }

                $produtos .= "<tr class='border'>
                            <td class='fonte produto border produto2'>" . $value->product->name . $com . "<br/>".$value->historico."</td>
                            <td class='fonte padding border produto'>" . $value->qtd . "</td>
                            <td class='price padding border'>$" . $value->subtotal . "</td>
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
                        <th class='fonte padding produto item'>Produto</th>
                        <th class='fonte padding produto item'>Qtd</th>                     
                        <th class='price padding item'>Vr.Uni</th>
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
                                        font-weight: bold;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: bold;
                                        font-size: 15px;
                                        
                                    }
                                    .price{
                                        margin-left: -20px;
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 6em;                                       
                                        text-transform: capitalize;
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
                                    .client{
                                        word-wrap: break-word;
                                        width: 18em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 16px;
                                    }
                                    .pedido{
                                        font-weight: bold;
                                        font-size: 22px;
                                    }
                                    .item{
										margin:0;
										padding:0;
									}
                                </style>
                            </head>
                            <body>
                                <div class='center item'>
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte pedido item'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                    <h5 class='data item'>Data: $data |  Hora: $hora</h5>
                                    <h5 class='data item'>Previsão: ".date('H:i:s',strtotime('+ 30 minutes',strtotime($hora)))."</h5>                              
                                    
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte client item'>Cliente: " . $order->client->name . "</h5>
                                    <h5 class='fonte client item'>Endereço: " . $order->client->addressClient->address . "," . $order->client->addressClient->numero . "</h5>
                                    <h5 class='fonte client item '>Complemento: " . $order->client->addressClient->complemento . "</h5>
                                    <h5 class='fonte client item'>Bairro: " . $order->client->addressClient->bairro . "</h5>
                                    <h5 class='fonte client item'>Cidade:    Guaxupé UF: MG</h5>
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte item'>ITENS:</h5>
                                    $table
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte item'>TOTAL DE ITENS: $contador</h5>
                                    <h5 class='fonte total item'>TOTAL DA COMPRA: R$ $order->total</h5>
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <p class='obs item'>$order->observacao</p>
                                    <h5 class='obs item'>$order->troco</h5>
                                    <h5 class='obs item'>$taxa</h5>
                                </div>
                            </body>
                        </html>")->save(public_path() . '/printer/' . $order->id . '.pdf');
        }else{
            $pdf->loadHTML("<html>
                            <head>
                                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>
                                <style>
                                     .fonte{
                                        font-weight: bold;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: bold;
                                        font-size: 15px;
                                        
                                    }
                                    .price{
                                        margin-left: -20px;
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 6em;                                       
                                        text-transform: capitalize;
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
                                    .client{
                                        word-wrap: break-word;
                                        width: 18em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 16px;
                                    }
                                    .pedido{
                                        font-weight: bold;
                                        font-size: 22px;
                                    }
                                </style>
                            </head>
                            <body>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte produto'>Pedido: $order->id | " . $order->mesa->name. "</h5>
                                <h5 class='data'>Data: $data | Hora: $hora | Previsão: ".date('H:i:s',strtotime('+ 20 minutes',strtotime($hora)))."</h5>                              
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte client item'>Cliente: " . $order->client->name . "</h5>    
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>ITENS:</h5>
                                $table
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte'>TOTAL DE ITENS: $contador</h5>
                                <h5 class='fonte total'>TOTAL DA COMPRA: R$ $order->total</h5>
                                <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                <p class='obs'>$order->observacao</p>
                                <h5 class='obs'>$taxa</h5>
                            </body>
                        </html>")->save(public_path() . '/printer/' . $order->id . '.pdf');
        }
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
            if($value->product->id != 58 && $value->ativo <> 'N') {
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
                            <td class='fonte padding produto produto2'>" . $value->product->name . $com . "<br/>".$value->historico."</td>
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
                                     .fonte{
                                        font-weight: bold;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: bold;
                                        font-size: 15px;
                                        
                                    }
                                    .price{
                                        margin-left: -20px;
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 6em;                                       
                                        text-transform: capitalize;
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
                                    .client{
                                        word-wrap: break-word;
                                        width: 18em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 16px;
                                    }
                                    .pedido{
                                        font-weight: bold;
                                        font-size: 22px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='center'>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte pedido'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                    <h5 class='fonte data'>Data: $data | Hora: $hora</h5>                              
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
                                        font-weight: bold;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: bold;
                                        font-size: 15px;
                                        
                                    }
                                    .price{
                                        margin-left: -20px;
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 6em;                                       
                                        text-transform: capitalize;
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
                                    .client{
                                        word-wrap: break-word;
                                        width: 18em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 16px;
                                    }
                                    .pedido{
                                        font-weight: bold;
                                        font-size: 22px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='center'>
                                    <h5 class='fonte'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte produto'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                    <h5 class='fonte'>Data: $data</h5>  
                                    <h5 class='fonte'>Hora: $hora</h5>                            
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte client item'>Cliente: " . $order->client->name . "</h5>
                                   
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

    public function printer2($id)
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

        try {
            $connector = new NetworkPrintConnector("192.168.0.199", 9100);
            $printer = new Printer($connector);
            $printer -> text("-------------------------------------------!\n
                    Pedido: $order->id | $order->mesa->mesa
            ");
            $printer -> cut();
            $printer -> close();
        } catch (\Exception $e) {
            echo "Couldn't print to this printer: " . $e -> getMessage() . "\n";
        }
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
            if($value->product->id != 58 && $value->ativo <> 'N') {

                    $com = '';
                    $id = $value->id;
                    $complements = $this->complementItemRepository->scopeQuery(function ($query) use ($id) {
                        return $query->where('order_item_id', $id);
                    })->all();
                    if ($complements) {
                        foreach ($complements as $v) {
                            $com .= "<br />" . $v->complement->name . " - R$" . $v->price;
                        }
                    } else {
                        $com = '';
                    }

                    $produtos .= "<tr class='border'>
                            <td class='fonte produto border produto2'>" . $value->product->name . $com . "<br/>" . $value->historico . "</td>
                            <td class='fonte padding border produto'>" . $value->qtd . "</td>
                            <td class='price padding border'>$" . $value->subtotal . "</td>
                            </tr>";
                    $this->itemRepository->update(['impresso' => 'S'], $value->id);
                    $contador += $value->qtd;


            }

            if($value->product->id == 58){
                $taxa = 'Taxa de entrega: R$'.$value->product->price ;
            }
        }

        $table = "<table class='item'>
                    <thead>
                      <tr class='item'>
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
                                        font-weight: bold;
                                        font-size: 18px;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: bold;
                                        font-size: 18px;
                                        
                                    }
                                    .price{
                                        margin-left: -20px;
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 6em;                                       
                                        text-transform: capitalize;
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
                                    .client{
                                        word-wrap: break-word;
                                        width: 18em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 16px;
                                    }
                                    .pedido{
                                        font-weight: bold;
                                        font-size: 22px;
                                    }
                                    .item{
										margin:0;
										padding:0;
									}
                                </style>
                            </head>
                            <body>
                                <div class='item'>
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte pedido item'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                    <h5 class='data item'>Data: $data |  Hora: $hora</h5>                              
                                    <h5 class='data item'>Previsão: ".date('H:i:s',strtotime('+ 20 minutes',strtotime($hora)))."</h5>
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte item'>Cliente: " . $order->client->name . "</h5>
                                    <h5 class='fonte client item'>Endereço: " . $order->client->addressClient->address . "," . $order->client->addressClient->numero . "</h5>
                                    <h5 class='fonte item'>Complemento: " . $order->client->addressClient->complemento . "</h5>
                                    <h5 class='fonte item'>Bairro: " . $order->client->addressClient->bairro . "</h5>
                                    <h5 class='fonte item'>Cidade:    Guaxupé UF: MG</h5>
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte item'>ITENS:</h5>
                                    $table
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <h5 class='fonte item'>TOTAL DE ITENS: $contador</h5>
                                    <h5 class='fonte total item'>TOTAL DA COMPRA: R$ $order->total</h5>
                                    <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                    <p class='obs item'>$order->observacao</p>
                                    <h5 class='obs item'>$order->troco</h5>
                                    <h5 class='obs item'>$taxa</h5>
                                </div>
                            </body>
                        </html>")->save(public_path() . '/printer/' . $order->id . '.pdf');
        }else{
            $pdf->loadHTML("<html>
                            <head>
                                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>
                                <style>
                                     .fonte{
                                        font-weight: bold;
                                        font-size: 18px;
                                    }
                                    .padding{
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 0;
                                        padding-top: 0;
                                        margin-left: 7px;
                                    }
                                    .produto{
                                        font-weight: bold;
                                        font-size: 18px;
                                        
                                    }
                                    .price{
                                        margin-left: -20px;
                                    }
                                    .produto2{                                   
                                        word-wrap: break-word;
                                        width: 6em;                                       
                                        text-transform: capitalize;
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
                                    .client{
                                        word-wrap: break-word;
                                        width: 18em;
                                        text-transform: capitalize;
                                    }
                                    .data{
                                        font-weight: bold;
                                        font-size: 16px;
                                    }
                                    .pedido{
                                        font-weight: bold;
                                        font-size: 22px;
                                    }
                                    .item{
                                        margin: 0;
                                        padding: 0;
                                    }
                                </style>
                            </head>
                            <body>
                                <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte pedido item'>Pedido: $order->id | " . $order->mesa->name . "</h5>
                                <h5 class='data item'>Data: $data | Hora: $hora</h5>
                                <h5 class='data item'>Previsão: ".date('H:i:s',strtotime('+ 20 minutes',strtotime($hora)))."</h5>                              
                                <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte client item'>Cliente: " . $order->client->name . "</h5>    
                                <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte item' style='padding: 0;margin: 0'>ITENS:</h5>
                                $table
                                <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                <h5 class='fonte item'>TOTAL DE ITENS: $contador</h5>
                                <h5 class='fonte total item'>TOTAL DA COMPRA: R$ $order->total</h5>
                                <h5 class='fonte item'>---------------------------------------------------------------------</h5>
                                <p class='obs item'>$order->observacao</p>
                                <h5 class='obs item'>$taxa</h5>
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