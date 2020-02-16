<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        return User::create([
            'name' => 'SuperAdmin',
            'email' => 'admin@openresto.com',
            'password' => bcrypt('admin1234'),
            'role' => 'SuperAdmin'
        ]);
    }
}
