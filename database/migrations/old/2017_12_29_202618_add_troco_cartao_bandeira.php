<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTrocoCartaoBandeira extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('troco')->nullable()->after('type')->default('50 reais');
            $table->string('cartao',3)->after('troco')->nullable()->default('Sim');
            $table->string('observacao')->after('cartao')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('troco');
            $table->dropColumn('cartao');
            $table->dropColumn('observacao');
        });
    }
}
