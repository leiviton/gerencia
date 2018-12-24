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
        $user = \Auth::user();
        $dataInicial = $request->get('inicio');
        $dataFinal = $request->get('final');
        $periodo = $this->invertDate($dataInicial)." a ".$this->invertDate($dataFinal);

        $input = base_path('/public/reports/list_products_sales_A4.jasper');
        $output = base_path("/public/reports/".$user->id."_product_sales");


        $options = [
            'format' => ['pdf'],
            'locale' => 'pt_BR',
            'params' => ['inicial'=>$dataInicial,'final'=>$dataFinal,'periodo'=>$periodo],
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
        //$jasper->compile($input)->execute();

        if($jasper->process(
            $input,
            $output,
            $options
        )->execute()) {
            return response()->json(['url'=>"/reports/".$user->id."_product_sales.pdf"],200);
        }else{
            return response()->json(['error'=>'report error'],400);
        }
    }

    public function invertDate($date){
        $result = '';
        if(count(explode("/",$date)) > 1){
            $result = implode("-",array_reverse(explode("/",$date)));
            return $result;
        }elseif(count(explode("-",$date)) > 1){
            $result = implode("/",array_reverse(explode("-",$date)));
            return $result;
        }
    }

}