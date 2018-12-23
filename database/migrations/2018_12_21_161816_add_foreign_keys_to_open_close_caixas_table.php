<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOpenCloseCaixasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('open_close_caixas', function(Blueprint $table)
		{
			$table->foreign('caixa_id')->references('id')->on('caixas')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('open_close_caixas', function(Blueprint $table)
		{
			$table->dropForeign('open_close_caixas_caixa_id_foreign');
		});
	}

}
