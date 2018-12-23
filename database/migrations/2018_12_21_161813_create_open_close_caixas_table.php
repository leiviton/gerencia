<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOpenCloseCaixasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('open_close_caixas', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('tipo', 191);
			$table->string('usuario', 191);
			$table->decimal('saldo');
			$table->integer('caixa_id')->unsigned()->nullable()->default(1)->index('open_close_caixas_caixa_id_foreign');
			$table->date('data_caixa');
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
		Schema::drop('open_close_caixas');
	}

}
