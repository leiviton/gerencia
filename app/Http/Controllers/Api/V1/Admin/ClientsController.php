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
    /**
     * @var AuditRepository
     */
    private $auditRepository;

    public function  __construct(ClientRepository $repository, ClientService $clientService,
                                 AuditRepository $auditRepository)
    {
        $this->repository = $repository;
        $this->clientService = $clientService;
        $this->auditRepository = $auditRepository;
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
            ->scopeQuery(function($query) use($pesquisa){
                return $query->orderBy('name','asc')->where('id',$pesquisa);
            })
            ->all();

        if(count($result['data']) == 0)
        {
            $result = $this->repository->skipPresenter(false)
                ->scopeQuery(function($query) use($pesquisa){
                    $like = '%'.$pesquisa.'%';
                    return $query->orderBy('name','asc')->where('name','like',$like)
                        ->orWhere('phone','like',$like);
                })
                ->all();
        }

        return $result;
    }

    public function edit($id)
    {
        $result = $this->repository->skipPresenter(false)->find($id);

        return $result;
    }

    public function store(Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $o = $this->clientService->create($data);

        if($o->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'cliente',
                'action' => 'Cadastrou o cliente: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($o->id);
    }

    public function update($id,Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $o = $this->clientService->update($data,$id);

        if($o->id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'cliente',
                'action' => 'Atualizou o cliente: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }

}