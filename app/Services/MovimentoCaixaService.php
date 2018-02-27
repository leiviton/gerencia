<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 10:49
 */

namespace Pedidos\Services;


use Pedidos\Repositories\CaixaRepository;
use Pedidos\Repositories\MovimentoCaixaRepository;
use Pedidos\Repositories\OpenCloseCaixasRepository;
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
    /**
     * @var CaixaRepository
     */
    private $caixaRepository;
    /**
     * @var OpenCloseCaixasRepository
     */
    private $openCloseCaixasRepository;

    public function __construct(MovimentoCaixaRepository $movimentoCaixaRepository, UserRepository $userRepository
    ,CaixaRepository $caixaRepository,OpenCloseCaixasRepository $openCloseCaixasRepository)
    {
        $this->userRepository = $userRepository;
        $this->movimentoCaixaRepository = $movimentoCaixaRepository;
        $this->caixaRepository = $caixaRepository;
        $this->openCloseCaixasRepository = $openCloseCaixasRepository;
    }

    public function update(array $data,$id){
        return $this->movimentoCaixaRepository->update($data, $id);
    }

    public function create($data){
        \DB::beginTransaction();
        try {
            $caixa = $this->caixaRepository->find($data['caixa_id']);

            $open = $this->openCloseCaixasRepository->countF('A');
            $close = $this->openCloseCaixasRepository->countF('F');

            if($open == 1)
            {
                if ($close == 1)
                {
                    $result = 'fechado';
                }else{
                    if($caixa->open_close == 'F')
                    {
                        $result = 'fechado';
                    }else {
                        if ($data['tipo_movimento'] == 'credito') {
                            $caixa->saldo += $data['valor'];
                        } else {
                            $caixa->saldo -= $data['valor'];
                        }
                        $result = $this->movimentoCaixaRepository->create($data);
                    }
                }
            }else{
                $result = 'fechado';
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