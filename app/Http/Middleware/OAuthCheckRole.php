<?php

namespace Pedidos\Http\Middleware;

use Closure;
use Pedidos\Repositories\UserRepository;

class OAuthCheckRole
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {

        $user = $this->userRepository->find($id);

        if ($user->role != $role){
            abort(403, 'Access Forbidden');
        }
        return $next($request);
    }
}
