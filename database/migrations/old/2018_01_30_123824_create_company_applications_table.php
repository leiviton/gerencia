<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyApplicationsTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('company_applications', function(Blueprint $table) {
            $table->increments('id');
            $table->string('razao_social');
            $table->string('nome_fantazia');
            $table->string('cnpj',20);
            $table->string('inscricao_estatual');
            $table->string('endereco');
            $table->string('numero');
            $table->string('complemento');
            $table->string('bairro');
            $table->string('cidade');
            $table->string('estado');
            $table->string('telefone');
            $table->string('whatsapp');
            $table->string('site');
            $table->string('responsavel');
            $table->string('cpf_responsavel');
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
