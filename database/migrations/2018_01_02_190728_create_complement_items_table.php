<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComplementItemsTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('complement_items', function(Blueprint $table) {
            $table->increments('id');

            $table ->integer('complement_id')->unsigned();
            $table->foreign('complement_id')->references('id')->on('complements');

            $table ->integer('order_item_id')->unsigned();
            $table->foreign('order_item_id')->references('id')->on('order_items');

            $table->decimal('price');
            $table->smallInteger('qtd');

            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('complement_itens');
	}

}
