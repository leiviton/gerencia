<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateComplementItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('complement_items', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('complement_id')->unsigned()->index('complement_items_complement_id_foreign');
			$table->integer('order_item_id')->unsigned()->index('complement_items_order_item_id_foreign');
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
		Schema::drop('complement_items');
	}

}
