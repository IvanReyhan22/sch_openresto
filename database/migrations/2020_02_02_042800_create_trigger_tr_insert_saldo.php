<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTriggerTrInsertSaldo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            CREATE TRIGGER `tr_insert_saldo` BEFORE INSERT ON `reserve` FOR EACH ROW
                BEGIN
                    DECLARE paid int;
                    IF new.paid > 0 THEN
                        SET paid = new.paid * -1;
                        INSERT INTO `saldo` (`user_id`, `jumlah`, `created_at`, `updated_at`) VALUES (new.user_id, paid, now(), now());
                    END IF;
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
        DB::unprepared("DROP TRIGGER IF EXISTS `tr_insert_saldo`");
    }
}
