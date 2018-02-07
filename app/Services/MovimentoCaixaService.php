<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 10:49
 */

namespace Pedidos\Services;


use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Repositories\UserRepository;

class MovimentoCaixaService
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var MovimentoCaixaRepository
     */
    private $movimentoCaixaRepository;

    public function __construct(MovimentoCaixaRepository $movimentoCaixaRepository, UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->movimentoCaixaRepository = $movimentoCaixaRepository;
    }

    public function update(array $data,$id){
        return $this->movimentoCaixaRepository->update($data, $id);
    }

    public function create($data){
        \DB::beginTransaction();
        try {
            $result = $this->movimentoCaixaRepository->create($data);
            \DB::commit();
            return $result;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }
}