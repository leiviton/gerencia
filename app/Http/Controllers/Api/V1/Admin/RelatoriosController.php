<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 15/11/2017
 * Time: 11:06
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Pedidos\Http\Controllers\Controller;
use Pedidos\Repositories\AuditRepository;
use Illuminate\Http\Request;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Services\CaixaService;
use PHPJasper\PHPJasper;

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

    public function reportProductsSales(Request $request) {
        $dataInicial = $request->get('inicio');
        $dataFinal = $request->get('final');

        $input = base_path('/public/reports/list_products_sales_A4.jrxml');
        $output = base_path('/public/reports/product_sales');

        $options = [
            'format' => ['pdf'],
            'locale' => 'pt_BR',
            'params' => ['inicial'=>$dataInicial,'final'=>$dataFinal],
            'db_connection' => [
                'driver' => env('DB_CONNECTION'), //mysql, ....
                'username' => env('DB_USERNAME'),
                'password' => env('DB_PASSWORD'),
                'host' => env('DB_HOST'),
                'database' => env('DB_DATABASE'),
                'port' => env('DB_PORT')
            ]
        ];

        $jasper = new PHPJasper();
        $jasper->compile($input)->execute();

        $jasper->process(
            $input,
            $output,
            $options
        )->execute();
    }


}