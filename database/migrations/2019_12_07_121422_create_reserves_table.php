<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reserve', function (Blueprint $table) {
            $table->string('no_transaksi')->primary();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('restoran_id');
            $table->integer('total_harga');
            $table->integer('paid')->nullable()->default(0);
            $table->string('status');
            $table->dateTime('mulai');
            $table->dateTime('selesai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reserve');
    }
}
