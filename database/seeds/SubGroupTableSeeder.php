<?php

use Illuminate\Database\Seeder;
use Pedidos\Models\Product;
use Pedidos\Models\Subgroup;

class SubGroupTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Subgroup::class, 10)->create();
    }
}
