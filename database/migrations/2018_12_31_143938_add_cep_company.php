<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCepCompany extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company_applications', function (Blueprint $table) {
            $table->string('cep',20)->nullable()->default('37.800-000')->after('inscricao_estatual');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_applications', function (Blueprint $table) {
            $table->dropColumn('cep');
        });
    }
}
