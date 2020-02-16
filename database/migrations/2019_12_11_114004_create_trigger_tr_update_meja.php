<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTriggerTrUpdateMeja extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER `tr_update_meja` AFTER UPDATE ON `restoran` FOR EACH ROW
            BEGIN
                DECLARE a int DEFAULT 1;
                DELETE FROM meja WHERE `restoran_id` = old.id;
                simple_loop : LOOP
                    IF a>new.jml_meja THEN
                        LEAVE simple_loop;
                    END IF;
                    INSERT INTO meja (`restoran_id`, `no_meja`, `status`, `created_at`, `updated_at`) VALUES (old.id, a, 'Available', now(), now());
                    SET a = a + 1;
                END LOOP simple_loop;
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
        DB::unprepared("DROP TRIGGER tr_update_meja");
    }
}
