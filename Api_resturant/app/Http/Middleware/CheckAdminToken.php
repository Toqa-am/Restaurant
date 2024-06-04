<?php

namespace App\Http\Middleware;

use App\Traits\GeneralTrait;
use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminToken
{
    use GeneralTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = null;
        try{
           // $user = JWTAuth::parseToken()->authenticate();
        }catch (\Exception $e)
        {
            if($e instanceof TokenInvalidException)
            {
                return $this->returnError('E3001','INVALID_TOKEN');
            } 
            else if($e instanceof TokenExpiredException)
            {
                return $this->returnError('E3001','EXPIRED_TOKEN');
                
            }
            else
            {
                return $this->returnError('E3001','TOKEN_NOTFOUND');
                
            }
        }
        if (!$user)
        {
          return   $this->returnError('E3001',trans('Unauthenticated'));
        }
        return $next($request);
    }
}
