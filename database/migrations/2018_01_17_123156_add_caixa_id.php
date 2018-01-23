<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCaixaId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('movimento_caixas', function (Blueprint $table) {
            $table->dropColumn('key');
            $table->dropColumn('entidade');

            $table->integer('caixa_id')->after('usuario')->unsigned()->nullable()->default(1);
            $table->foreign('caixa_id')->references('id')->on('caixas');

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

            $table->dropColumn('caixa_id');
            $table->dropForeign('caixa_id');
        });
    }
}
