<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCaixasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('caixas', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 191);
			$table->string('ativo', 191)->default('S');
			$table->decimal('saldo')->default(0.00);
			$table->char('open_close', 1);
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
		Schema::drop('caixas');
	}

}
