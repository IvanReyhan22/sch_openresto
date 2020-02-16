<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyOnReserveMejaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reserve_meja', function (Blueprint $table) {
            $table->foreign('no_transaksi')->references('no_transaksi')->on('reserve');
            $table->foreign('meja_id')->references('id')->on('meja');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reserve_meja', function (Blueprint $table) {
            $table->dropForeign('reserve_meja_no_transaksi_foreign');
            $table->dropForeign('reserve_meja_meja_id_foreign');
        });
    }
}
