<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 08/08/2016
 * Time: 10:49
 */

namespace Pedidos\Services;


use Pedidos\Repositories\AddressClientRepository;
use Pedidos\Repositories\ClientRepository;
use Pedidos\Repositories\UserRepository;

class ClientService
{
    /**
     * @var ClientRepository
     */
    private $clientRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var AddressClientRepository
     */
    private $addressClientRepository;

    public function __construct(ClientRepository $clientRepository, UserRepository $userRepository,
                                AddressClientRepository $addressClientRepository)
    {

        $this->clientRepository = $clientRepository;
        $this->userRepository = $userRepository;
        $this->addressClientRepository = $addressClientRepository;
    }

    public function update(array $data,$id){
        $client['name'] = $data['name'];
        $client['phone'] = $data['phone'];
        $client['address'] = $data['address']['address'].','.$data['address']['numero'];
        $this->clientRepository->update($client, $id);

        //$userId = $this->clientRepository->find($id, ['user_id'])->user_id;

        //$this->userRepository->update($data['user'], $userId);
    }

    public function create($data){
        \DB::beginTransaction();
        try {
            $user = [];
            $client = [];

            if($data['email'] != '')
            {
                $user['name'] = $data['name'];
                $user['email'] = $data['email'];
                $user['password'] = bcrypt(123456);
                $user = $this->userRepository->create($user);
                $client['user_id'] = $user->id;
            }

            $address = $this->addressClientRepository->create($data['address']);
            $client['name'] = $data['name'];
            $client['phone'] = $data['phone'];
            $client['address'] = $address->address.', '.$address->numero.', '.$address->bairro.' - '.$address->city->city;
            $client['status'] = 0;
            $client['address_client_id'] = $address->id;
            $result = $this->clientRepository->create($client);
            \DB::commit();
            return $result;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }
}