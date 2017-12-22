<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovimentoCaixasTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('movimento_caixas', function(Blueprint $table) {
            $table->increments('id');
            $table->string('tipo_movimento');
            $table->decimal('valor');
            $table->string('usuario');
            $table->string('key');
            $table->string('entidade');
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
