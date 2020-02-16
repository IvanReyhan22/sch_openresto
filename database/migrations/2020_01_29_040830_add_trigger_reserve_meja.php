<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTriggerReserveMeja extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER `tr_reserve_meja` AFTER INSERT ON `reserve_meja` FOR EACH ROW
            BEGIN
                UPDATE `meja` SET `status` = 'Booked' WHERE `id` = NEW.meja_id;
            END
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS tr_reserve_meja');
    }
}
