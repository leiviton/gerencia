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
use Pedidos\Repositories\OpenCloseCaixasRepository;
use Pedidos\Repositories\UserRepository;

class OpenCloseCaixaService
{
    /**
     * @var ClientRepository
     */
    private $repository;
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
    /**
     * @var CaixaRepository
     */
    private $caixaRepository;

    public function __construct(OpenCloseCaixasRepository $repository, UserRepository $userRepository, CaixaRepository $caixaRepository)
    {

        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->caixaRepository = $caixaRepository;
    }

    public function update(array $data,$id){
        return $this->repository->update($data, $id);
    }

    public function create($data){
        \DB::beginTransaction();
        try {
            $caixa = $this->caixaRepository->find($data['caixa_id']);

            $open = $this->repository->countF('A');
            $close = $this->repository->countF('F');
            if($open == 1){
                if ($close == 1)
                {
                    $result = 'fechado';
                }else{
                    if($caixa->open_close == 'A'){
                        $data['tipo'] = 'F';
                        $data['saldo'] = $caixa->saldo;
                        $caixa->open_close = 'F';
                    }
                    $result = $this->repository->create($data);
                }
            }elseif ($open == 0)
            {
                if ($caixa->open_close == 'A'){
                    $result = 'caixa_aberto_data';
                }else{
                    $data['tipo'] = 'A';
                    $data['saldo'] = $caixa->saldo;
                    $caixa->open_close = 'A';

                    $result = $this->repository->create($data);
                }
            }

            $caixa->save();
            \DB::commit();
            return $result;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }
}