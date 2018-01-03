<?php

namespace Pedidos\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'Pedidos\Repositories\CategoryRepository',
            'Pedidos\Repositories\CategoryRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\ClientRepository',
            'Pedidos\Repositories\ClientRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\OrderItemRepository',
            'Pedidos\Repositories\OrderItemRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\OrderRepository',
            'Pedidos\Repositories\OrderRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\ProductRepository',
            'Pedidos\Repositories\ProductRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\UserRepository',
            'Pedidos\Repositories\UserRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\CupomRepository',
            'Pedidos\Repositories\CupomRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\MesaRepository',
            'Pedidos\Repositories\MesaRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\PaymentOrdersRepository',
            'Pedidos\Repositories\PaymentOrdersRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\PaymentTypesRepository',
            'Pedidos\Repositories\PaymentTypesRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\CaixaRepository',
            'Pedidos\Repositories\CaixaRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\MovimentoCaixaRepository',
            'Pedidos\Repositories\MovimentoCaixaRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\AddressClientRepository',
            'Pedidos\Repositories\AddressClientRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\CityRepository',
            'Pedidos\Repositories\CityClientRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\CountryRepository',
            'Pedidos\Repositories\CountryRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\StateRepository',
            'Pedidos\Repositories\StateRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\ComplementRepository',
            'Pedidos\Repositories\ComplementRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\ComplementItemRepository',
            'Pedidos\Repositories\ComplementItemRepositoryEloquent'
        );
    }
}

