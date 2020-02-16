<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyOnReserveMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reserve_menu', function (Blueprint $table) {
            $table->foreign('no_transaksi')->references('no_transaksi')->on('reserve');
            $table->foreign('menu_id')->references('id')->on('menu');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reserve_menu', function (Blueprint $table) {
            $table->dropForeign('reserve_menu_no_transaksi_foreign');
            $table->dropForeign('reserve_menu_menu_id_foreign');
        });
    }
}
