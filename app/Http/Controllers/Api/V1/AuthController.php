<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 07/12/2017
 * Time: 12:34
 */

namespace CodeDelivery\Http\Controllers\Api;

use Pedidos\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function logout()
    {
        if (\Auth::check()) {
            \Auth::user()->oauthAccessToken()->delete();
        }
        return response()->json(['status' => 'success']);
    }
}