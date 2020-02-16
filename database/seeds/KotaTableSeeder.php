<?php

use App\Kota;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class KotaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json_kota = File::get(database_path('json/kota.json'));
        $data_kota = collect(json_decode($json_kota));
        foreach ($data_kota as $d) {
            $d = collect($d)->toArray();
            $k = new Kota();
            $k->fill($d);
            $k->save();
        }
    }
}
