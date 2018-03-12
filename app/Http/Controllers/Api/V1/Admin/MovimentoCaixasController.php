<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 15/11/2017
 * Time: 11:06
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Carbon\Carbon;
use Pedidos\Http\Controllers\Controller;
use Pedidos\Http\Requests\AdminProductRequest;
use Pedidos\Repositories\AuditRepository;
use Illuminate\Http\Request;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Services\CaixaService;
use Pedidos\Services\MovimentoCaixaService;

class MovimentoCaixasController extends Controller
{

    private $auditRepository;
    /**
     * @var MovimentoCaixaService
     */
    private $service;
    /**
     * @var MovimentoCaixaRepository
     */
    private $repository;

    public function  __construct(MovimentoCaixaRepository $repository,AuditRepository $auditRepository, MovimentoCaixaService $service)
    {
        $this->auditRepository = $auditRepository;
        $this->repository = $repository;
        $this->service = $service;
    }

    public function index()
    {
        return $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function($query){
                return $query->where('created_at','>=',Carbon::now()->startOfDay());
            })
            ->all();
    }

    public function getFiltros(Request $request)
    {
        return $this->repository->skipPresenter(false)
            ->filter($request->all());
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

        $data['usuario'] = $user->email;

        $o = $this->service->create($data);

        if ($o == 'fechado') {
            return response()->json($o);
        } else {
            if ($o->id) {
                $audit = [
                    'type' => 'insert',
                    'user_id' => $user->id,
                    'user' => $user->email,
                    'entity' => 'movimento caixa',
                    'action' => 'Criou um movimento no caixa de codigo: ' . $o->id
                ];

                $this->auditRepository->create($audit);
            }

            return $this->repository
                ->skipPresenter(false)
                ->find($o->id);

        }
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
                'entity' => 'movimento caixa',
                'action' => 'Atualizou o movimento de caixa: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }

}