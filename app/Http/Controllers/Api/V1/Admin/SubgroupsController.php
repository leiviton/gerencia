<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 15/11/2017
 * Time: 10:17
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Pedidos\Repositories\SubgroupRepository;

class SubgroupsController
{
    /**
     * @var SubgroupRepository
     */
    private $repository;

    public function __construct(SubgroupRepository $repository){

        $this->repository = $repository;
    }

    public function index()
    {
        return $this->repository
            ->skipPresenter(false)
            ->all();
    }

}