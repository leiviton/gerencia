<?php

use Pedidos\Models\Order;
use Pedidos\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Order::class, 60)->create()->each(function ($c){
            for ($i=0; $i<=2; $i++){
                $c->items()->save(factory(OrderItem::class)->make([
                    'product_id' => rand(1,5),
                    'qtd' => 2,
                    'price' => 50
                ]));
            }
        });
    }
}
