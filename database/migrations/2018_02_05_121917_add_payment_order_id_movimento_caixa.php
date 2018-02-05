<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPaymentOrderIdMovimentoCaixa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('movimento_caixas', function (Blueprint $table) {
            //
            $table->integer('payment_order_id')->after('usuario')->unsigned()->nullable()->default(1);
            $table->foreign('payment_order_id')->references('id')->on('payment_orders');
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
            $table->dropColumn('payment_order_id');
            $table->dropForeign('payment_order_id');
        });
    }
}
