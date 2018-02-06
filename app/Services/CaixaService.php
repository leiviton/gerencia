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

    public function __construct(CaixaRepository $caixaRepository, UserRepository $userRepository)
    {

        $this->caixaRepository = $caixaRepository;
        $this->userRepository = $userRepository;
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
}