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
use Pedidos\Repositories\ClientRepository;
use Pedidos\Services\ClientService;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    /**
     * @var ClientRepository
     */
    private $repository;
    /**
     * @var ClientService
     */
    private $clientService;

    public function  __construct(ClientRepository $repository, ClientService $clientService)
    {
        $this->repository = $repository;
        $this->clientService = $clientService;
    }

    public function index()
    {
        return $this->repository
            ->skipPresenter(false)
            ->all();
    }

    public function search(Request $request)
    {
        $pesquisa = $request->get('value');

        $result = $this->repository->skipPresenter(false)
            ->search($pesquisa);
        return $result;
    }

    public function edit($id)
    {
        $result = $this->repository->skipPresenter(false)->find($id);

        return $result;
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $o = $this->clientService->create($data);

        return $this->repository
            ->skipPresenter(false)
            ->find($o->id);
    }

    public function update($id, AdminProductRequest $request)
    {
        $data = $request->all();

        $this->clientService->update($data,$id);

        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }

}