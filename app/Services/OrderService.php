<?php


namespace Pedidos\Services;


use Faker\Provider\DateTime;
use Pedidos\Models\Order;
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
     * @var PushProcessor
     * private $pusherProcessor;
     */


    public function __construct(
        OrderRepository $orderRepository,
        CupomRepository $cupomRepository,
        ProductRepository $productRepository,
        MesaRepository $mesaRepository,
        OrderItemRepository $itemRepository
        //PushProcessor $pushProcessor
    )
    {
        $this->orderRepository = $orderRepository;
        $this->cupomRepository = $cupomRepository;
        $this->productRepository = $productRepository;

        //$this->pushProcessor = $pushProcessor;
        $this->mesaRepository = $mesaRepository;
        $this->itemRepository = $itemRepository;
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
            $mesa = $this->mesaRepository->find($data['mesa_id']);

            foreach ($items as $item){
                $complements = '';
                $item['price'] = $this->productRepository->find($item['product_id'])->price;
                $item['order_id'] = $order->id;
                $res = $this->itemRepository->create($item);//$order->items()->create($item);

                if($item['complements'] && $item['complements'] != '')
                {
                    $complements = $item['complements'];
                    foreach ($complements as $c){
                        $res->complementItems()->create($c);
                    }
                }

            }

            $total = $data['total'];

            if($order->type == 0)
            {
                $this->productRepository->create($taxa);
                $mesa->status = 3;
                $total += $taxa->price;
            }else{
                $mesa->status = 1;
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
        $order->status = $data['status'];
        $mesaAnt = $this->mesaRepository->find($data['mesa_id_ant']);
        $mesaAnt->save();
        $mesa = $this->mesaRepository->find($data['mesa_id']);
        $order->mesa_id = $data['mesa_id'];
        $mesa->status = 1;
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
            $order->paymentOrders()->create($data);
            if($order->total > ($data['total_pago'] + $data['desconto']))
            {
                $order->status = 4;
            }else{
                $order->status = 3;
            }

            if($order->type == 1)
            {
                $mesa->status = 0;
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
}

