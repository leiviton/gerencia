<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentOrdersTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment_orders', function(Blueprint $table) {
            $table->increments('id');
            $table ->integer('order_id')->unsigned();
            $table->foreign('order_id')->references('id')->on('orders');
            $table->decimal('total_pago');
            $table->decimal('desconto');
            $table->decimal('acrescimo');
            $table->decimal('total_original');
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
