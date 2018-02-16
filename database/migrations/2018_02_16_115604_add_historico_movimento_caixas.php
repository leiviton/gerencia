<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHistoricoMovimentoCaixas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('movimento_caixas', function (Blueprint $table) {
            $table->string('historico')->after('usuario')->nullable();
            $table->string('ativo',1)->after('historico')->default('S');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('movimento_caixas', function (Blueprint $table) {
            $table->dropColumn('historico');
        });
    }
}
