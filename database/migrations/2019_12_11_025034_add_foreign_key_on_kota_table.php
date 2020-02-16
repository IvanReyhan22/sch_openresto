<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyOnKotaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('kota', function (Blueprint $table) {
            $table->foreign('provinsi_id')->references('id')->on('provinsi')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('kota', function (Blueprint $table) {
            $table->dropForeign('kota_provinsi_id_foreign');
        });
    }
}
