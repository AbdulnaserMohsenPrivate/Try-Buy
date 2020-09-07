<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //$user_type = auth()->user()->type;
        
        // $userId = \Auth::id();
        // if($userId == '')
        //     return redirect('/home');

        // $user = User::find($userId);

        // //if($user_type == 'User')
        // if($user->type == 'User')
        // {
        //     return redirect('user/products/all');
        // }
        // return $next($request);
        if(!Auth::check()) return abort(404);
        else if(auth()->user()->type <  1) return abort(404);

        return $next($request);
    }
}
