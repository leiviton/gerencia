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
use Pedidos\Repositories\AuditRepository;
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
    /**
     * @var AuditRepository
     */
    private $auditRepository;

    public function  __construct(ProductRepository $repository, ProductService $productService,
        AuditRepository $auditRepository)
    {
        $this->repository = $repository;
        $this->productService = $productService;
        $this->auditRepository = $auditRepository;


        $this->middleware('permission:product-list');
        $this->middleware('permission:product-create', ['only' => ['create','store']]);
        $this->middleware('permission:product-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:product-delete', ['only' => ['destroy']]);
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
        $user = \Auth::guard('api')->user();

        $data = $request->all();
        $o = $this->productService->create($data);

        if($o->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'products',
                'action' => 'Inseriou o produto: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($o->id);
    }

    public function update($id, AdminProductRequest $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $result = $this->productService->update($data,$id);

        if($result->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'mesas',
                'action' => 'Inseriou a mesa: '.$result->id
            ];

            $this->auditRepository->create($audit);
        }
        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }

}