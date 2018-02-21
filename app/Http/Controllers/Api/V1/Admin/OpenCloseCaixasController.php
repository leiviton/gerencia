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
use Pedidos\Repositories\AuditRepository;
use Illuminate\Http\Request;
use Pedidos\Repositories\OpenCloseCaixasRepository;
use Pedidos\Services\OpenCloseCaixaService;

class OpenCloseCaixasController extends Controller
{
    /**
     * @var AuditRepository
     */
    private $auditRepository;
    /**
     * @var OpenCloseCaixaService
     */
    private $service;
    /**
     * @var OpenCloseCaixasRepository
     */
    private $repository;

    public function  __construct(OpenCloseCaixasRepository $repository,AuditRepository $auditRepository, OpenCloseCaixaService $service)
    {
        $this->auditRepository = $auditRepository;
        $this->service = $service;
        $this->repository = $repository;
    }

    public function index()
    {
        return $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function($query){
                return $query->where('data_caixa','>=',Carbon::now()->startOfDay());
            })->all();
    }

    public function getDateCaixa(Request $request)
    {
        $data = new \DateTime($request->get('data'));
        return $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function($query) use($data){
                return $query->where('data_caixa',$data/*Carbon::now()->startOfDay()*/);
            })->all();
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

        $d = date('Y-m-d');

        if($data['data_caixa'] == $d) {
            $open = $this->repository->findWhere(['data_caixa' => $data['data_caixa'], 'tipo' => 'F']);

            if (count($open) > 0) {
                //return response()->json($open);
                return response()->json('fechado');
            } else {
                $o = $this->service->create($data);

                if ($o->id) {
                    $audit = [
                        'type' => 'insert',
                        'user_id' => $user->id,
                        'user' => $user->email,
                        'entity' => 'open_close_caixas',
                        'action' => 'Abriu/Fechou o caixa: ' . $o->id
                    ];

                    $this->auditRepository->create($audit);
                }

                return $this->index();
            }
        }else{
            return response()->json('data_diverge');
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
                'entity' => 'open_close_caixas',
                'action' => 'Atualizou o caixa: '.$o->id
            ];

            $this->auditRepository->create($audit);
        }

        return $this->repository
            ->skipPresenter(false)
            ->find($id);
    }
}