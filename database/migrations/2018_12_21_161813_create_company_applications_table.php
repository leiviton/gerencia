<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCompanyApplicationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('company_applications', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('razao_social', 191);
			$table->string('nome_fantazia', 191);
			$table->string('cnpj', 20);
			$table->string('inscricao_estatual', 191);
			$table->string('endereco', 191);
			$table->string('numero', 191);
			$table->string('complemento', 191);
			$table->string('bairro', 191);
			$table->string('cidade', 191);
			$table->string('estado', 191);
			$table->string('telefone', 191);
			$table->string('whatsapp', 191);
			$table->string('site', 191);
			$table->string('responsavel', 191);
			$table->string('cpf_responsavel', 191);
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
		Schema::drop('company_applications');
	}

}
