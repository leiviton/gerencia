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
use Pedidos\Repositories\CaixaRepository;
use Illuminate\Http\Request;
use Pedidos\Services\CaixaService;

class CaixasController extends Controller
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
    /**
     * @var CaixaService
     */
    private $service;

    public function  __construct(CaixaRepository $repository,AuditRepository $auditRepository, CaixaService $service)
    {
        $this->repository = $repository;
        $this->auditRepository = $auditRepository;
        $this->service = $service;
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
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $o = $this->service->create($data);

        if($o->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'caixa',
                'action' => 'Cadastrou o caixa: '.$o->id
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

        $o = $this->service->update($data,$id);

        if($o->id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'caixa',
                'action' => 'Atualizou o caixa: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }

    public function transferencia(Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $data['user_create'] = $user->email;

        $result = $this->service->transferenciaCaixa($data);

        if ($result == 'ok')
        {
            $audit = [
                'type' => 'update',
                'user_id' => $user->id,
                'user' => $user->email,
                'entity' => 'caixa',
                'action' => 'Transferiu do caixa: ' . $data['caixa1'] . 'para o caixa' . $data['caixa2'] . ', o valor de ' . $data['valor']
            ];

            $this->auditRepository->create($audit);

            return $this->index();
        }else if ($result == 'fechado_origem')
        {
            return response()->json('fechado_origem');
        }else if ($result == 'fechado_destino')
        {
            return response()->json('fechado_destino');
        }
    }

    public function saque(Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $data['user_create'] = $user->email;

        $result = $this->service->saque($data);

        if ($result == 'fechado') {
            return response()->json($result);
        } else {
            $audit = [
                'type' => 'update',
                'user_id' => $user->id,
                'user' => $user->email,
                'entity' => 'caixa',
                'action' => 'Realizou saque no caixa: ' . $data['caixa_id'] . ', no valor de ' . $data['valor']
            ];

            $this->auditRepository->create($audit);

            return $result;
        }
    }
}