<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyOnRestoranFacilityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('restoran_facility', function (Blueprint $table) {
            $table->foreign('restoran_id')->references('id')->on('restoran');
            $table->foreign('facility_id')->references('id')->on('facility');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('restoran_facility', function (Blueprint $table) {
            $table->dropForeign('restoran_facility_restoran_id_foreign');
            $table->dropForeign('restoran_facility_facility_id_foreign');
        });
    }
}
