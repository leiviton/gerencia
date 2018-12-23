<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAddressClientsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('address_clients', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('address', 191);
			$table->string('complemento', 191)->nullable();
			$table->string('numero', 191);
			$table->string('bairro', 191);
			$table->integer('city_id')->unsigned()->nullable()->index('address_clients_city_id_foreign');
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
		Schema::drop('address_clients');
	}

}
