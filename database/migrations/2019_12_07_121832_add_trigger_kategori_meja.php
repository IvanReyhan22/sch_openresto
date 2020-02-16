<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddTriggerKategoriMeja extends Migration
{

    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER `tr_kategori_meja` AFTER INSERT ON `restoran` FOR EACH ROW
            BEGIN
                DECLARE a int DEFAULT 1;
                INSERT INTO `kategori` (`restoran_id`, `nama`, `created_at`, `updated_at`)
                VALUES (NEW.id, 'Uncategorized', now(), now());
                simple_loop : LOOP
                    IF a>new.jml_meja THEN
                        LEAVE simple_loop;
                    END IF;
                    INSERT INTO meja (`restoran_id`, `no_meja`, `status`, `created_at`, `updated_at`) 
                    VALUES (new.id, a, 'Available', now(), now());
                    SET a = a + 1;
                END LOOP simple_loop;
            END
        ");
    }

    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS tr_kategori_meja');
    }
}
