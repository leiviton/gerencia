<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment_orders', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('order_id')->unsigned()->index('payment_orders_order_id_foreign');
			$table->decimal('total_pago');
			$table->decimal('desconto');
			$table->decimal('acrescimo');
			$table->decimal('total_original');
			$table->string('ativo', 1)->default('S');
			$table->integer('payment_types_id')->unsigned()->nullable()->index('payment_orders_payment_types_id_foreign');
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
		Schema::drop('payment_orders');
	}

}
