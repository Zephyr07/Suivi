<?php

namespace App\Http\Controllers;

use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\UserRequest;
use App\User;


class userController extends Controller
{
    //
    public function index(){
        return RestHelper::get(user::class);
    }

    public function create()
    {
        //
    }

    public function store(UserRequest $request)
    {
        //
        return RestHelper::store(user::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(user::class, $id);
    }

    public function edit($id)
    {
        //
    }

    public function update(UserRequest $request, $id)
    {
        //
        return RestHelper::update(user::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(user::class, $id);
    }
}
