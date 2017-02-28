<?php

namespace App\Http\Controllers;

use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\ClientRequest;
use App\client;

class clientController extends Controller
{
    //
    public function index(){
        return RestHelper::get(client::class);
    }

    public function create()
    {
        //
    }

    public function store(ClientRequest $request)
    {
        //
        return RestHelper::store(client::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(client::class, $id);
    }

    public function edit($id)
    {
        //
    }

    public function update(ClientRequest $request, $id)
    {
        //
        return RestHelper::update(client::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(client::class, $id);
    }
}
