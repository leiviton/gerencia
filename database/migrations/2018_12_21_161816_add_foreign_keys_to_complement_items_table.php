<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToComplementItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('complement_items', function(Blueprint $table)
		{
			$table->foreign('complement_id')->references('id')->on('complements')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('order_item_id')->references('id')->on('order_items')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('complement_items', function(Blueprint $table)
		{
			$table->dropForeign('complement_items_complement_id_foreign');
			$table->dropForeign('complement_items_order_item_id_foreign');
		});
	}

}
