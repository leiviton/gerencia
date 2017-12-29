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
        $this->clientRepository->update($data, $id);

        $userId = $this->clientRepository->find($id, ['user_id'])->user_id;

        $this->userRepository->update($data['user'], $userId);
    }

    public function create($data){
        $user['name'] = $data['name'];
        $user['email'] = $data['email'];
        $user['password'] = bcrypt(123456);
        $user = $this->userRepository->create($user);
        $data['user_id'] = $user->id;
        $address = $this->addressClientRepository->create($data['address']);
        $data['address_client_id'] = $address->id;
        return $this->clientRepository->create($data);
    }
}