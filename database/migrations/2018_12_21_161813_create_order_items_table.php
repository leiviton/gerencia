<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_items', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('product_id')->unsigned()->index('order_items_product_id_foreign');
			$table->integer('order_id')->unsigned()->index('order_items_order_id_foreign');
			$table->decimal('price');
			$table->smallInteger('qtd');
			$table->timestamps();
			$table->decimal('subtotal')->default(0.00);
			$table->string('impresso', 1)->nullable()->default('N');
			$table->string('historico', 191)->nullable();
			$table->string('ativo', 1)->default('S');
			$table->string('user_create', 191)->nullable();
			$table->string('user_update', 191)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('order_items');
	}

}
