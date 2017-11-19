<?php

namespace CodeDelivery\Http\Controllers;

use CodeDelivery\Http\Requests\AdminCategoryRequest;
use CodeDelivery\Http\Requests\AdminCupomRequest;
use CodeDelivery\Repositories\CategoryRepository;
use CodeDelivery\Repositories\CupomRepository;
use Illuminate\Http\Request;
use CodeDelivery\Http\Requests;


class CupomsController extends Controller
{
    private $repository;

    public function  __construct(CupomRepository $repository){
        $this->repository = $repository;
    }
    public function index()
    {
        $cupoms = $this->repository->paginate();
        return view('admin.cupoms.index',compact('cupoms'));
    }

    public function create(){
        return view('admin.cupoms.create');
    }

    public function store(AdminCupomRequest $request)
    {
        $data = $request->all();

        $this->repository->create($data);

        return redirect()->route('admin.cupoms.index');

    }

    public function edit($id)
    {

        $category = $this->repository->find($id);

        return view('admin.categories.edit',compact('category'));
    }

    public function update(AdminCategoryRequest $request, $id)
    {
        $data = $request->all();

        $this->repository->update($data, $id);

        return redirect()->route('admin.categories.index');
    }
}
