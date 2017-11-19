<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 17/08/2016
 * Time: 15:26
 */

namespace Pedidos\Http\Controllers\Api;


use Pedidos\Http\Controllers\Controller;
use Pedidos\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
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