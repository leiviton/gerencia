<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 10:49
 */

namespace Pedidos\Services;


use Pedidos\Repositories\AddressClientRepository;
use Pedidos\Repositories\CaixaRepository;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Repositories\UserRepository;

class CaixaService
{
    /**
     * @var ClientRepository
     */
    private $caixaRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var AddressClientRepository
     */
    private $addressClientRepository;
    /**
     * @var MovimentoCaixaService
     */
    private $movimentoCaixaService;

    public function __construct(CaixaRepository $caixaRepository, UserRepository $userRepository, MovimentoCaixaService $movimentoCaixaService)
    {

        $this->caixaRepository = $caixaRepository;
        $this->userRepository = $userRepository;
        $this->movimentoCaixaService = $movimentoCaixaService;
    }

    public function update(array $data,$id){
        return $this->caixaRepository->update($data, $id);
    }

    public function create($data){
        \DB::beginTransaction();
        try {
            $result = $this->caixaRepository->create($data);
            \DB::commit();
            return $result;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }

    public function transferenciaCaixa($data)
    {
        $caixa1 = $this->caixaRepository->find($data['caixa1']);

        $caixa2 = $this->caixaRepository->find($data['caixa2']);

        $caixa1->saldo -= $data['valor'];

        $caixa2->saldo += $data['valor'];

        $movimento1 = [
            'tipo_movimento' => 'debito',
            'valor' => $data['valor'],
            'usuario' => $data['user_create'],
            'historico' => 'Transferencia enviada para o caixa: '.$caixa2->name,
            'payment_order_id' => null,
            'caixa_id' => $caixa1->id
        ];

        $movimento2 = [
            'tipo_movimento' => 'credito',
            'valor' => $data['valor'],
            'usuario' => $data['user_create'],
            'historico' => 'Transferencia creditada do caixa: '.$caixa1->name,
            'payment_order_id' => null,
            'caixa_id' => $caixa2->id
        ];

        $this->movimentoCaixaService->create($movimento1);

        $this->movimentoCaixaService->create($movimento2);

        $caixa1->save();

        $caixa2->save();
    }


    public function saque($data)
    {
        $caixa = $this->caixaRepository->find($data['caixa_id']);

        $caixa->saldo -= $data['valor'];

        $movimento = [
            'tipo_movimento' => 'debito',
            'valor' => $data['valor'],
            'usuario' => $data['user_create'],
            'historico' => $data['historico'],
            'caixa_id' => $caixa->id
        ];

        $this->movimentoCaixaService->create($movimento);

        $caixa->save();

        return $caixa;
    }
}