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

            if($caixa->open_close == 'A'){
                $data['tipo'] = 'F';
                $data['saldo'] = $caixa->saldo;
            }elseif ($caixa->open_close == 'F'){
                $data['tipo'] = 'A';
                $data['saldo'] = $caixa->saldo;
            }else{
                $data['tipo'] = 'A';
                $data['saldo'] = $caixa->saldo;
            }

            $caixa->open_close = $data['tipo'];
            $caixa->save();
            $result = $this->repository->create($data);

            \DB::commit();
            return $result;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }
}