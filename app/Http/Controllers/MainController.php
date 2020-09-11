<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App;
use Auth;

class MainController extends Controller
{
	//lang
    public function lang($locale)
    {
        App::setLocale($locale);
        session()->put('locale', $locale);
        return redirect()->back();
    }

    public function index()
    {
        $page=0; //0 default 1 for user's page  2 for admin's page
        if(Auth::check() && Auth::user()->type > 0)
        {
            $page = 1;   
        }
        
        return view('index_original', compact('page'));
    }

    public function admin()
    {
        $page = 2;

        return view('admin', compact('page'));
    }


}
