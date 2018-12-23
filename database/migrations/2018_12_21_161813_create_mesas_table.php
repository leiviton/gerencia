<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMesasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mesas', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 191);
			$table->string('description', 191)->nullable();
			$table->timestamps();
			$table->smallInteger('status')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('mesas');
	}

}
