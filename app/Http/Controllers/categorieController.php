<?php

namespace App\Http\Controllers;

use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\EventRequest;
use App\categorie;

class categorieController extends Controller
{
    //
    public function index(){
        return RestHelper::get(categorie::class);
    }

    public function create()
    {
        //
    }

    public function store(EventRequest $request)
    {
        //
        return RestHelper::store(categorie::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(categorie::class, $id);
    }

    public function edit($id)
    {
        //
    }

    public function update(EventRequest $request, $id)
    {
        //
        return RestHelper::update(categorie::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(categorie::class, $id);
    }
}
