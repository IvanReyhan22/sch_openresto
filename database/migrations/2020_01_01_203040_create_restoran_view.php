<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateRestoranView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            CREATE VIEW `v_restoran` AS 
                SELECT
    `restoran`.`id` AS `id`,
    `restoran`.`nama` AS `nama`,
    `restoran`.`tags` AS `tags`,
    `restoran`.`alamat` AS `alamat`,
    `restoran`.`deskripsi` AS `deskripsi`,
    `restoran`.`logo` AS `logo`,
    `restoran`.`foto` AS `foto`,
    `kota`.`nama` AS `nama_kota`,
    `provinsi`.`nama` AS `nama_provinsi`,
    MAX(`meja`.`no_meja`) AS `jml_meja`,
    MIN(`menu`.`harga`) AS `harga_min`,
    AVG(`rating`.`rating`) AS `rating`
FROM
    `restoran`
INNER JOIN `kota` ON `restoran`.`kota_id` = `kota`.`id`
INNER JOIN `provinsi` ON `kota`.`provinsi_id` = `provinsi`.`id`
INNER JOIN `meja` ON `meja`.`restoran_id` = `restoran`.`id`
INNER JOIN `rating` ON `rating`.`restoran_id` = `restoran`.id
INNER JOIN `kategori` ON `kategori`.`restoran_id` = `restoran`.`id`
INNER JOIN `menu` ON `menu`.`kategori_id` = `kategori`.`id`
WHERE
    `meja`.`status` = 'Available' AND `menu`.`status` = 1
GROUP BY
    `restoran`.`id`");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP VIEW IF EXISTS `v_restoran`");
    }
}
