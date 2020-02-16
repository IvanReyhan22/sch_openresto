<?php

namespace App\Providers;

use App\Repositories\AuthRepository;
use App\Repositories\KotaRepository;
use App\Repositories\MejaRepository;
use App\Repositories\MenuRepository;
use App\Repositories\SaldoRepository;
use App\Repositories\UsersRepository;
use App\Repositories\RatingRepository;
use App\Repositories\ReserveRepository;
use App\Repositories\ProfileRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ProvinsiRepository;
use App\Repositories\RestoranRepository;
use App\Repositories\FacilityRepository;
use App\Repositories\KategoriRepository;
use App\Repositories\Interfaces\AuthRepositoryInterface;
use App\Repositories\Interfaces\KotaRepositoryInterface;
use App\Repositories\Interfaces\MejaRepositoryInterface;
use App\Repositories\Interfaces\MenuRepositoryInterface;
use App\Repositories\Interfaces\SaldoRepositoryInterface;
use App\Repositories\Interfaces\UsersRepositoryInterface;
use App\Repositories\Interfaces\RatingRepositoryInterface;
use App\Repositories\Interfaces\ProfileRepositoryInterface;
use App\Repositories\Interfaces\ReserveRepositoryInterface;
use App\Repositories\Interfaces\FacilityRepositoryInterface;
use App\Repositories\Interfaces\KategoriRepositoryInterface;
use App\Repositories\Interfaces\ProvinsiRepositoryInterface;
use App\Repositories\Interfaces\RestoranRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(
            MenuRepositoryInterface::class,
            MenuRepository::class
        );
        $this->app->bind(
            MejaRepositoryInterface::class,
            MejaRepository::class
        );
        $this->app->bind(
            AuthRepositoryInterface::class,
            AuthRepository::class
        );
        $this->app->bind(
            KotaRepositoryInterface::class,
            KotaRepository::class
        );
        $this->app->bind(
            SaldoRepositoryInterface::class,
            SaldoRepository::class
        );
        $this->app->bind(
            UsersRepositoryInterface::class,
            UsersRepository::class
        );
        $this->app->bind(
            RatingRepositoryInterface::class,
            RatingRepository::class
        );
        $this->app->bind(
            ProvinsiRepositoryInterface::class,
            ProvinsiRepository::class
        );
        $this->app->bind(
            ReserveRepositoryInterface::class,
            ReserveRepository::class
        );
        $this->app->bind(
            RestoranRepositoryInterface::class,
            RestoranRepository::class
        );
        $this->app->bind(
            KategoriRepositoryInterface::class,
            KategoriRepository::class
        );
        $this->app->bind(
            FacilityRepositoryInterface::class,
            FacilityRepository::class
        );
        $this->app->bind(
            ProfileRepositoryInterface::class,
            ProfileRepository::class
        );
    }
}
