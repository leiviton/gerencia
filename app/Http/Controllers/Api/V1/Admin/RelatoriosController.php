<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 15/11/2017
 * Time: 11:06
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Illuminate\Support\Facades\App;
use Pedidos\Http\Controllers\Controller;
use Pedidos\Repositories\AuditRepository;
use Illuminate\Http\Request;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Services\CaixaService;

class RelatoriosController extends Controller
{

    private $repository;

    /**
     * @var AuditRepository
     */
    private $auditRepository;
    /**
     * @var CaixaService
     */
    private $service;

    public function  __construct(MovimentoCaixaRepository $repository,AuditRepository $auditRepository, CaixaService $service)
    {
        $this->repository = $repository;
        $this->auditRepository = $auditRepository;
        $this->service = $service;
    }

    public function gerarRelMovCaixa(Request $request)
    {
        $data = $request->all();

        $result = $this->repository->skipPresenter(false)->filter($data);

        return $result;
    }
}