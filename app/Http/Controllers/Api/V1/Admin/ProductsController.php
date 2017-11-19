<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 15/11/2017
 * Time: 11:06
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Pedidos\Http\Controllers\Controller;
use Pedidos\Http\Requests\AdminProductRequest;
use Pedidos\Repositories\ProductRepository;
use Pedidos\Services\ProductService;

class ProductsController extends Controller
{
    /**
     * @var ProductRepository
     */
    private $repository;
    /**
     * @var ProductService
     */
    private $productService;

    public function  __construct(ProductRepository $repository, ProductService $productService)
    {
        $this->repository = $repository;
        $this->productService = $productService;
    }

    public function index()
    {
        $status = 0;
        return $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function ($query)use($status){
                return $query->where('status',$status);
            })
            ->all();
    }

    public function edit($id)
    {
        $result = $this->repository->skipPresenter(false)->find($id);

        return $result;
    }

        public function store(AdminProductRequest $request)
    {
        $data = $request->all();
        $o = $this->productService->create($data);

        return $this->repository
            ->skipPresenter(false)
            ->find($o->id);
    }

    public function update($id, AdminProductRequest $request)
    {
        $data = $request->all();

        $this->productService->update($data,$id);

        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }

}