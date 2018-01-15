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
        $role = 'admin';
        return $this->userRepository->skipPresenter(false)
            ->scopeQuery(function($query) use($role){
                return $query->where('role','<>',$role)->where('role','<>','client');
            })
            ->all();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $result = $this->service->create($data);

        return $this->userRepository->skipPresenter(false)->find($result->id);

    }

    public function edit($id)
    {
        return $this->userRepository->skipPresenter(false)->find($id);
    }

    public function update($id,Request $request)
    {
        $data = $request->all();

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

    public function changePassword($id,Request $request)
    {
        $rules = [
            'password' => 'required|min:6',
            'password_confirmation' => 'same:password'
        ];

        $this->validate($request, $rules);
        $user = $this->userRepository->find($id)
            ->first();

        $user = $this->userRepository->update(['password' => bcrypt($request->get('password'))],$id);

        return $this->userRepository->skipPresenter(false)->find($user->id);
    }

    public function valid($id,Request $request)
    {
        $password = $this->userRepository->find($id,['password']);

        $p = $request->get('password');

        if($password === bcrypt($p))
        {
            return 1;
        }else{
            return 0;
        }
    }
}