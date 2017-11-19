<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 10:49
 */

namespace Pedidos\Services;


use Pedidos\Repositories\ProductRepository;

class ProductService
{


    /**
     * @var ProductRepository
     */
    private $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function update(array $data,$id){
        $this->repository->update($data, $id);
    }

    public function create(array $data){
        return $this->repository->create($data);
    }
}