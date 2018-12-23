<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateClientsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('clients', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned()->nullable()->index('clients_user_id_foreign');
			$table->string('name', 191)->default('Consumidor Final');
			$table->string('phone', 191);
			$table->text('address', 65535);
			$table->smallInteger('status')->default(0);
			$table->integer('address_client_id')->unsigned()->nullable()->index('clients_address_client_id_foreign');
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
		Schema::drop('clients');
	}

}
