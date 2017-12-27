<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCityIdAddressClients extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('address_clients', function (Blueprint $table) {
            $table->integer('city_id')->after('numero')->unsigned()->nullable();
            $table->foreign('city_id')->references('id')->on('cities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('address_clients', function (Blueprint $table) {
            $table->dropColumn('city_id');
            $table->dropForeign('city_id');
        });
    }
}
