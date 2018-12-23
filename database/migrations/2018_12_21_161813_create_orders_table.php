<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('orders', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('client_id')->unsigned()->index('orders_client_id_foreign');
			$table->integer('user_deliveryman_id')->unsigned()->nullable()->index('orders_user_deliveryman_id_foreign');
			$table->decimal('total');
			$table->decimal('paid_now')->nullable()->default(0.00);
			$table->smallInteger('status')->default(0);
			$table->smallInteger('type')->default(0);
			$table->string('troco', 191)->nullable();
			$table->string('cartao', 3)->nullable()->default('Sim');
			$table->string('observacao', 191)->nullable();
			$table->string('link_printer', 191)->nullable();
			$table->timestamps();
			$table->integer('cupom_id')->unsigned()->nullable()->index('orders_cupom_id_foreign');
			$table->smallInteger('mesa_id')->nullable()->default(1);
			$table->string('address', 191)->nullable();
			$table->string('user_create', 191)->nullable();
			$table->string('user_update', 191)->nullable();
			$table->string('motivo_cancelamento', 191)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('orders');
	}

}
