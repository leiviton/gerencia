<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddChavePayment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('payment_orders', function (Blueprint $table) {
            $table->integer('payment_types_id')->after('total_original')->unsigned()->nullable();
            $table->foreign('payment_types_id')->references('id')->on('payment_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('payment_orders', function (Blueprint $table) {
            $table->dropColumn('payment_types_id');
            $table->dropForeign('payment_types_id');
        });
    }
}
