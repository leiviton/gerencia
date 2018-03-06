<?php


namespace Pedidos\Services;


use Faker\Provider\DateTime;
use Pedidos\Models\MovimentoCaixa;
use Pedidos\Models\Order;
use Pedidos\Repositories\CaixaRepository;
use Pedidos\Repositories\ComplementItemRepository;
use Pedidos\Repositories\CupomRepository;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Repositories\OrderItemRepository;
use Pedidos\Repositories\OrderRepository;
use Pedidos\Repositories\PaymentOrdersRepository;
use Pedidos\Repositories\ProductRepository;
//use Dmitrovskiy\IonicPush\PushProcessor;
use Illuminate\Support\Facades\DB;

class OrderService{
    /**
     * @var OrderRepository
     */
    private $orderRepository;
    /**
     * @var CupomRepository
     */
    private $cupomRepository;
    /**
     * @var ProductRepository
     */
    private $productRepository;
    /**
     * @var MesaRepository
     */
    private $mesaRepository;
    /**
     * @var OrderItemRepository
     */
    private $itemRepository;
    /**
     * @var ComplementItemRepository
     */
    private $complementItemRepository;
    /**
     * @var MovimentoCaixaRepository
     */
    private $movimentoCaixaRepository;
    /**
     * @var PaymentOrdersRepository
     */
    private $paymentOrdersRepository;
    /**
     * @var CaixaRepository
     */
    private $caixaRepository;

    /**
     * @var PushProcessor
     * private $pusherProcessor;
     */


    public function __construct(
        OrderRepository $orderRepository,
        CupomRepository $cupomRepository,
        ProductRepository $productRepository,
        MesaRepository $mesaRepository,
        OrderItemRepository $itemRepository,
        ComplementItemRepository $complementItemRepository,
        MovimentoCaixaRepository $movimentoCaixaRepository,
        PaymentOrdersRepository $paymentOrdersRepository,
        CaixaRepository $caixaRepository
        //PushProcessor $pushProcessor
    )
    {
        $this->orderRepository = $orderRepository;
        $this->cupomRepository = $cupomRepository;
        $this->productRepository = $productRepository;

        //$this->pushProcessor = $pushProcessor;
        $this->mesaRepository = $mesaRepository;
        $this->itemRepository = $itemRepository;
        $this->complementItemRepository = $complementItemRepository;
        $this->movimentoCaixaRepository = $movimentoCaixaRepository;
        $this->paymentOrdersRepository = $paymentOrdersRepository;
        $this->caixaRepository = $caixaRepository;
    }

    public function create(array $data){

        \DB::beginTransaction();

        try {
            $data['status'] = 0;
            $taxa = $this->productRepository->find(58);
            if (isset($data['cupom_id'])){
                unset($data['cupom_id']);
            }
            if (isset($data['cupom_code'])){
                $cupom = $this->cupomRepository->findByField('code',$data['cupom_code'])->first();
                $data['cupom_id'] = $cupom->id;
                $cupom->used = 1;
                $cupom->save();
                unset($data['cupom_code']);
            }
            $items = $data['items'];
            $order = $this->orderRepository->create($data);
            $order->address = $order->client->addressClient->address.
                ','.$order->client->addressClient->numero.
                ','.$order->client->addressClient->bairro.
                ','.$order->client->addressClient->city->city.
                '-'.$order->client->addressClient->city->state->state;
            $mesa = $this->mesaRepository->find($data['mesa_id']);
            $order->user_create = $data['user_create'];
            $order->user_update = $data['user_create'];

            foreach ($items as $item){
                $complements = '';
                $item['price'] = $this->productRepository->find($item['product_id'])->price;
                $item['order_id'] = $order->id;
                $res = $this->itemRepository->create($item);//$order->items()->create($item);

                $res->user_create = $data['user_create'];
                $res->user_update = $data['user_create'];
                if($item['complements'] && $item['complements'] != '')
                {
                    $complements = $item['complements'];
                    foreach ($complements as $c){
                        $res->complementItems()->create($c);
                    }
                }
                $res->save();
            }

            $total = $data['total'];

            if($order->type == 0)
            {
                $atual = new \DateTime();
                DB::insert('insert into order_items (id,product_id,order_id,price,qtd,subtotal,created_at,updated_at) values(?,?,?,?,?,?,?,?)',[null,$taxa->id,$order->id,$taxa->price,1,$taxa->price,$atual,$atual]);
                $mesa->status = 3;
                $total += $taxa->price;
            }else if($order->type == 1){
                $mesa->status = 1;
            }else if($order->type == 2){
                $mesa->status = 3;
            }

            $order->total = $total;

            $order->mesa_id = $data['mesa_id'];

            if (isset($cupom)){
                $order->total = $total - $cupom->value;
            }
            $mesa->save();
            $order->save();

            \DB::commit();

            return $order;
        } catch (\Exception $e){
             \DB::rollback();
            throw $e;
        }
    }

    public function updateStatus($data,$id){
        $order = $this->orderRepository->find($id);
        $taxa = $this->productRepository->find(58);
        $order->status = $data['status'];
        $mesaAnt = $this->mesaRepository->find($data['mesa_id_ant']);
        $mesaAnt->save();
        $mesa = $this->mesaRepository->find($data['mesa_id']);
        $order->mesa_id = $data['mesa_id'];
        $mesa->status = 1;
        $order->observacao = $data['observacao'];

        $order->user_update = $data['user_update'];
        $item = $this->itemRepository->findWhere(['product_id'=>58,'order_id'=>$order->id]);
        if($order->type != (int)$data['type']){
            if ((int)$data['type'] == 0)
            {
                if(count($item) == 0)
                {
                    $atual = new \DateTime();
                    DB::insert('insert into order_items (id,product_id,order_id,price,qtd,subtotal,created_at,updated_at) values(?,?,?,?,?,?,?,?)',[null,$taxa->id,$order->id,$taxa->price,1,$taxa->price,$atual,$atual]);
                }else{
                    $id = 58;
                    $order_id = $order->id;
                    $item = $this->itemRepository->scopeQuery(function($query) use($id,$order_id){
                        return $query->where('product_id',$id)
                            ->where('order_id',$order_id);
                    })->all();
                    DB::update('update order_items set ativo = ? where order_id = ? and product_id = ?',['S',$order->id,58]);

                }
                $mesa->status = 3;
                $order->type = $data['type'];
                $order->total += $taxa->price;
            }

            if((int) $data['type_ant'] == 0 && (int)$data['type'] == 2)
            {
                DB::update('update order_items set ativo = ? where order_id = ? and product_id = ?',['N',$order->id,58]);
                $mesa->status = 3;
                $order->type = $data['type'];
                $order->total -= $taxa->price;
            }
        }
        switch ((int)$data['status']){
            case 1:
                $order->save();
                break;
            case 2:
                $order->save();
                break;
        }
        $mesa->save();
        $order->save();
        return $order;
    }

    public function pagyment($id,$data)
    {
        \DB::beginTransaction();

        try {
            $order = $this->orderRepository->find($id);
            $mesa = $this->mesaRepository->find($order->mesa->id);
            $caixa = $this->caixaRepository->find(1);
            if($order->total == $order->paid_now)
            {
                return $order;
            }else {
                $data['order_id'] = $order->id;
                $payment = $this->paymentOrdersRepository->create($data);

                $order->user_update = $data['user_create'];
                if ($order->total > ((float) $data['total_pago'] + (float) $data['desconto'] + $order->paid_now)) {
                    $order->status = 4;
                } else {
                    $order->status = 3;
                }

                if ($order->type == 1) {
                    $mesa->status = 0;
                }else{
                    $mesa->status = 3;
                }

                if($mesa->id == 1) {
                    $mesa->status = 3;
                }

                $order->paid_now += $data['total_pago'];

                if($payment->paymentTypes->id == 1) {
                    $this->movimentoCaixaRepository->create(['tipo_movimento' => 'credito', 'valor' => $data['total_pago'], 'usuario' => $data['user_create'], 'payment_order_id' => $payment->id,'historico'=>'Movimento gerado pelo recebimento do pedido: '.$order->id, 'caixa_id' => 1]);
                    $caixa->saldo += $data['total_pago'];
                }
                $caixa->save();
                $mesa->save();
                $order->save();
            }
            \DB::commit();
            return $order;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }

    public function updateLocation($order,$geo){
        $order->geo = $geo->lat.','.$geo->long;
        if (!$order->geo){
            $order->save();
        }
        return $order;
    }

    public function addItem($data)
    {
        \DB::beginTransaction();

        try {

            $order = $this->orderRepository->find((int)$data['order_id']);

            $items = $data['items'];

            $total = $order->total;

            foreach ($items as $item){
                $item['price'] = $this->productRepository->find($item['product_id'])->price;
                $order->items()->create($item);
                $total += $item['price'] * $item['qtd'];
            }

            $order->total = $total;
            $order->save();
            \DB::commit();
            return $order;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }

    public function addComplement($data)
    {
        $order = $this->orderRepository->find($data['order_id']);

        $item = $this->itemRepository->find($data['item_id']);

        $complements = $data['complements'];

        foreach ($complements as $c){
            $item->complementItems()->create($c);
            $item->subtotal += $c['price'];
            $order->total += $c['price'];
        }

        $item->save();
        $order->save();

        return $order;
    }

    public function addHistorico($data)
    {
        $order = $this->orderRepository->find($data['order_id']);

        $item = $this->itemRepository->find($data['item_id']);

        $item->historico = $data['historico'];

        $item->save();
        //$this->itemRepository->update(['historico'=>$data['historico']],$item->id);
        return $order;
    }

    public function removeItem($id)
    {
        $item = $this->itemRepository->find($id);

        $complments = $this->complementItemRepository->findWhere(['order_item_id'=>$item->id]);

/*        foreach ($complments as $c)
        {
            $this->complementItemRepository->delete($c->id);
        }
*/
        $order = $this->orderRepository->find($item->order_id);

        $order->total -= $item->subtotal;

        $item->ativo = 'N';

        $item->save();

        $order->save();

        return $order;

    }

    public function cancel($data, $id)
    {
        $order = $this->orderRepository->find($id);

        $mesa = $this->mesaRepository->find($order->mesa_id);

        $order->motivo_cancelamento = $data['motivo_cancelamento'];
        $order->user_update = $data['user_update'];
        $order->status = 5;

        if($order->type == 1) {
            $mesa->status = 0;
        }
        $mesa->save();
        $order->save();

        return $order;
    }

    public function openOrder($data)
    {
        $order = $this->orderRepository->find($data);

        $order->motivo_cancelamento = 'Pedido reaberto';

        $order->status = 0;

        $order->paid_now = 0;

        $payments = $this->paymentOrdersRepository->findWhere(['order_id'=>$order->id]);

        $caixa = $this->caixaRepository->find(1);

        for($i = 0; $i < sizeof($payments); $i++){
            $movimento = $this->movimentoCaixaRepository->findWhere(['payment_order_id'=>$payments[$i]->id,'ativo'=>'S']);
            for($j = 0; $j < sizeof($movimento); $j++) {
                $movimento[$j]->ativo = 'N';
                $movimento[$j]->save();
            }

            if($payments[$i]->paymentTypes->id == 1 && $payments[$i]->ativo == 'S')
            {
                $caixa->saldo -= $payments[$i]->total_pago;
            }

            $payments[$i]->ativo = 'N';
            $payments[$i]->save();
        }

        $order->save();
        $caixa->save();

        return $order;
    }

    public function report($data)
    {
        if($data['cliente'] === 'todos' && $data['tipo'] === 'todos')
        {
            $result = DB::select('select * from report_orders_types_payments where ativo = ? and (data BETWEEN ? AND ? )', [$data['ativo'], $data['inicio'], $data['fim']]);
        }elseif ($data['cliente'] !== 'todos' && $data['tipo'] === 'todos')
        {
            $result = DB::select('select * from report_orders_types_payments where ativo = ? and cliente_id = ? and (data BETWEEN ? AND ? )', [$data['ativo'], $data['cliente'], $data['inicio'], $data['fim']]);
        }elseif ($data['cliente'] === 'todos' && $data['tipo'] !== 'todos')
        {
            $result = DB::select('select * from report_orders_types_payments where ativo = ? and tipo_id = ? and (data BETWEEN ? AND ? )', [$data['ativo'], $data['tipo'], $data['inicio'], $data['fim']]);
        }else {
            $result = DB::select('select * from report_orders_types_payments where ativo = ? and cliente_id = ? and tipo_id = ? and (data BETWEEN ? AND ? )', [$data['ativo'], $data['cliente'], $data['tipo'], $data['inicio'], $data['fim']]);
        }
        return $result;
    }
}

