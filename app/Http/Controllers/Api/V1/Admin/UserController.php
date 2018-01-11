<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 17/08/2016
 * Time: 15:26
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Pedidos\Http\Controllers\Controller;
use Pedidos\Repositories\UserRepository;
use Illuminate\Http\Request;
use Pedidos\Services\UserService;

class UserController extends Controller
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var UserService
     */
    private $service;

    public function __construct(UserRepository $userRepository, UserService $service)
    {
        $this->userRepository = $userRepository;
        $this->service = $service;
    }

    public function index()
    {
        return $this->userRepository->skipPresenter(false)->all();
    }

    public function store($data)
    {
        $result = $this->service->create($data);

        return $this->userRepository->skipPresenter(false)->find($result->id);

    }

    public function edit($id)
    {
        return $this->userRepository->skipPresenter(false)->find($id);
    }

    public function update($data,$id)
    {
        $result = $this->service->update($data,$id);

        return $this->userRepository->skipPresenter(false)->find($result->id);
    }

    public function authenticated(){
        $user = \Auth::guard('api')->user();

        return $this->userRepository->skipPresenter(false)->find($user->id);
    }

    public function updateDeviceToken(Request $request){
        $id = Authorizer::getResourceOwnerId();

        $deviceToken = $request->get('device_token');

        return $this->userRepository->updateDeviceToken($id,$deviceToken);
    }
}