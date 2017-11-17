<?php

namespace App\Http\Proxy;

/**
 * token   Proxy代理
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/14 0014
 * Time: 下午 9:12
 */
class TokenProxy
{
    protected $http;

    /**
     * TokenProxy constructor.
     * @param $http
     */
    public function __construct(\GuzzleHttp\Client $http)
    {
        $this->http = $http;
    }

    /**
     * @param $email
     * @param $password
     * @return TokenProxy|\Illuminate\Http\JsonResponse
     */
    public function login($email, $password)
    {
        //判断用户是否登录并激活
        if (auth()->attempt(['email' => $email, 'password' => $password, 'is_active' => 1])) {
            return $this->proxy('password', [
                'username' => $email,
                'password' => $password,
                'scope' => ''
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => 'Credentials not match'
        ], 421);
    }


    /**
     * 退出登录及删除accessToken
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $user = auth()->guard('api')->user();

        if (is_null($user)) {
            app('cookie')->queue(app('cookie')->forget('refreshToken'));

            return response()->json([
                'message' => 'Logout!'
            ], 204);
        }

        $accessToken = $user->token();

        app('db')->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true,
            ]);

        app('cookie')->queue(app('cookie')->forget('refreshToken'));

        $accessToken->revoke();
        return response()->json([
            'message' => 'Logout!'
        ], 204);
    }


    public function refresh()
    {
        $refreshToken = request()->cookie('refreshToken');

        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    //oauth/token   引入guzzlehttp/guzzle

    /**
     * 获取accessToken并设置cookie
     * @param $grantType
     * @param array $data
     * @return $this
     */
    public function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id' => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
            'grant_type' => $grantType,
        ]);
        $response = $this->http->post(env('APP_URL') . '/oauth/token', [
            'form_params' => $data
        ]);
        $token = json_decode((string)$response->getBody(), true);

        //返回access_token及有效时间，并设置cookie 过期时间为10天
        return response()->json([
            'token' => $token['access_token'],
            'auth_id' => md5($token['refresh_token']),
            'expires_in' => $token['expires_in'],
        ])->cookie('refreshToken', $token['refresh_token'], 14400, null, null, false, true);
    }
}