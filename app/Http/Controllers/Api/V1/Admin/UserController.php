<?php
/**
 * Created by PhpStorm.
 * User: leviton
 * Date: 17/08/2016
 * Time: 15:26
 */

namespace Pedidos\Http\Controllers\Api\V1\Admin;


use Pedidos\Http\Controllers\Controller;
use Pedidos\Repositories\AuditRepository;
use Pedidos\Repositories\UserRepository;
use Illuminate\Http\Request;
use Pedidos\Services\UserService;
use Illuminate\Support\Facades\DB;

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
    /**
     * @var AuditRepository
     */
    private $auditRepository;

    public function __construct(UserRepository $userRepository, UserService $service, AuditRepository $auditRepository)
    {
        $this->userRepository = $userRepository;
        $this->service = $service;
        $this->auditRepository = $auditRepository;
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
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $result = $this->service->create($data);

        if($result->id)
        {
            $audit = [
                'type'=>'insert',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'user',
                'action' => 'criou o usuario: '.$result->name
            ];

            $this->auditRepository->create($audit);
        }
        return $this->userRepository->skipPresenter(false)->find($result->id);
    }

    public function edit($id)
    {
        return $this->userRepository->skipPresenter(false)->find($id);
    }

    public function update($id,Request $request)
    {
        $user = \Auth::guard('api')->user();

        $data = $request->all();

        $result = $this->service->update($data,$id);

        if($result->id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $user->email,
                'entity' => 'user',
                'action' => 'Atualizou o usuario: '.$result->name
            ];

            $this->auditRepository->create($audit);
        }

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
        $u = \Auth::guard('api')->user();

        $rules = [
            'password' => 'required|min:6',
            'password_confirmation' => 'same:password'
        ];

        $this->validate($request, $rules);
        $user = $this->userRepository->find($id)
            ->first();

        $user = $this->userRepository->update(['password' => bcrypt($request->get('password'))],$id);
        if($user->id)
        {
            $audit = [
                'type'=>'update',
                'user_id'=>$user->id,
                'user' => $u->email,
                'entity' => 'user',
                'action' => 'trocou a senha do usuario: '.$user->name
            ];

            $this->auditRepository->create($audit);
        }

        return $this->userRepository->skipPresenter(false)->find($user->id);
    }

    public function valid($id,Request $request)
    {
        $password = DB::select("select password from users where id = $id");

        $p = $request->get('password');

        if($password[0]->password === bcrypt($p))
        {
            return 1;
        }else{
            return $password[0]->password.' , 1:'.bcrypt($p);
        }
    }
}