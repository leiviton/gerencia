<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOpenCloseCaixasTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('open_close_caixas', function(Blueprint $table) {
            $table->increments('id');
            $table->string('tipo');
            $table->string('usuario');
            $table->decimal('saldo');
            $table->integer('caixa_id')->unsigned()->nullable()->default(1);
            $table->foreign('caixa_id')->references('id')->on('caixas');
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
