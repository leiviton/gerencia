<?php


namespace Pedidos\Services;


use Faker\Provider\DateTime;
use Pedidos\Models\Order;
use Pedidos\Repositories\ComplementItemRepository;
use Pedidos\Repositories\CupomRepository;
use Pedidos\Repositories\MesaRepository;
use Pedidos\Repositories\OrderItemRepository;
use Pedidos\Repositories\OrderRepository;
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
     * @var PushProcessor
     * private $pusherProcessor;
     */


    public function __construct(
        OrderRepository $orderRepository,
        CupomRepository $cupomRepository,
        ProductRepository $productRepository,
        MesaRepository $mesaRepository,
        OrderItemRepository $itemRepository,
        ComplementItemRepository $complementItemRepository
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
                    $order->observacao = ' teste if 2';
                    $atual = new \DateTime();
                    DB::insert('insert into order_items (id,product_id,order_id,price,qtd,subtotal,created_at,updated_at) values(?,?,?,?,?,?,?,?)',[null,$taxa->id,$order->id,$taxa->price,1,$taxa->price,$atual,$atual]);
                }else{
                    $order->observacao = ' teste if aqui';
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

           /* if((int)$data['type'] == 1 && (int)$data['mesa_id'] != (int)$data['mesa_id_ant'] && (int) $data['type_ant'] == 0)
            {

                $order->observacao .= ' teste if 1';
                if($this->itemRepository->findWhere(['product_id'=>58,'order_id'=>$order->id]))
                {

                    $order->observacao .= ' teste if';
                    $id = 58;
                    $order_id = $order->id;
                    $item = $this->itemRepository->scopeQuery(function($query) use($id,$order_id){
                        return $query->where('product_id',$id)
                            ->where('order_id',$order_id);
                    })->all();
                    DB::update('update order_items set ativo = ? where order_id = ? and product_id = ?',['N',$order->id,58]);
                    $order->total -= $taxa->price;
                }

                $order->type = (int)$data['type'];
                $order->mesa_id = $data['mesa_id'];
                $mesa->status = 0;
                $this->mesaRepository->update(['status'=>1],(int) $data['mesa_id']);
            }

            if((int)$data['type'] == 1 && (int)$data['mesa_id'] != (int)$data['mesa_id_ant'] && (int) $data['type_ant'] == 2)
            {

                $order->observacao .= ' teste if 2';
                if($this->itemRepository->findWhere(['product_id'=>58,'order_id'=>$order->id]))
                {

                    $order->observacao .= ' teste if';
                    $id = 58;
                    $order_id = $order->id;
                    $item = $this->itemRepository->scopeQuery(function($query) use($id,$order_id){
                        return $query->where('product_id',$id)
                            ->where('order_id',$order_id);
                    })->all();
                    DB::update('update order_items set ativo = ? where order_id = ? and product_id = ?',['N',$order->id,58]);
                }

                $order->type = (int)$data['type'];
                $order->mesa_id = $data['mesa_id'];
                $mesa->status = 0;
                $this->mesaRepository->update(['status'=>1],(int) $data['mesa_id']);
            }
*/

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
            if($order->total == $order->paid_now)
            {
                return $order;
            }else {
                $order->paymentOrders()->create($data);

                $order->user_update = $data['user_create'];
                if ($order->total > ($data['total_pago'] + $data['desconto'] + $order->paid_now)) {
                    $order->status = 4;
                } else {
                    $order->status = 3;
                }

                if ($order->type == 1) {
                    $mesa->status = 0;
                }

                $order->paid_now += $data['total_pago'];

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
}

