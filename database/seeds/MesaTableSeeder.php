<?php

use Illuminate\Database\Seeder;
use Pedidos\Models\Mesa;

class MesaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Mesa::class)->create([
            'name' => 'Delivery',
            'description' => 'Delivery'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 1',
            'description' => 'Mesa 1'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 2',
            'description' => 'Mesa 2'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 3',
            'description' => 'Mesa 3'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 4',
            'description' => 'Mesa 4'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 5',
            'description' => 'Mesa 5'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 6',
            'description' => 'Mesa 6'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 7',
            'description' => 'Mesa 7'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 8',
            'description' => 'Mesa 8'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 9',
            'description' => 'Mesa 9'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 10',
            'description' => 'Mesa 10'
        ]);

        factory(Mesa::class)->create([
            'name' => 'Mesa 11',
            'description' => 'Mesa 11'
        ]);
    }
}
