<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyOnMejaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('meja', function (Blueprint $table) {
            $table->foreign('restoran_id')->references('id')->on('restoran')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('meja', function (Blueprint $table) {
            $table->dropForeign('meja_restoran_id_foreign');
        });
    }
}
