<?php

use App\Provinsi;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProvinsiTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json_provinsi = File::get(database_path('json/provinsi.json'));
        $data_provinsi = collect(json_decode($json_provinsi));
        foreach ($data_provinsi as $d) {
            $d = collect($d)->toArray();
            $p = new Provinsi();
            $p->fill($d);
            $p->save();
        }
    }
}
