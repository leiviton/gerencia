<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMovimentoCaixasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('movimento_caixas', function(Blueprint $table)
		{
			$table->foreign('caixa_id')->references('id')->on('caixas')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('payment_order_id')->references('id')->on('payment_orders')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('movimento_caixas', function(Blueprint $table)
		{
			$table->dropForeign('movimento_caixas_caixa_id_foreign');
			$table->dropForeign('movimento_caixas_payment_order_id_foreign');
		});
	}

}
