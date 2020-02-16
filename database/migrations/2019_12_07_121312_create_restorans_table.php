<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestoransTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restoran', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nama')->index();
            $table->string('tags')->nullable()->index();
            $table->text('alamat');
            $table->unsignedInteger('kota_id');
            $table->text('deskripsi');
            $table->string('logo');
            $table->string('foto')->nullable();
            $table->integer('jml_meja');
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
        Schema::dropIfExists('restoran');
    }
}
