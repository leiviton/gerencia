<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMovimentoCaixasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('movimento_caixas', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('tipo_movimento', 191);
			$table->decimal('valor');
			$table->string('usuario', 191);
			$table->string('historico', 191)->nullable();
			$table->string('ativo', 1)->default('S');
			$table->integer('payment_order_id')->unsigned()->nullable()->index('movimento_caixas_payment_order_id_foreign');
			$table->integer('caixa_id')->unsigned()->nullable()->default(1)->index('movimento_caixas_caixa_id_foreign');
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
		Schema::drop('movimento_caixas');
	}

}
