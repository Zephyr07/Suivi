<?php

namespace App\Http\Controllers;

use App\visite;
use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\VisiteRequest;

class visiteController extends Controller
{
    //
    public function index(){
        return RestHelper::get(visite::class);
    }

    public function create()
    {
        //
    }

    public function store(VisiteRequest $request)
    {
        //
        return RestHelper::store(visite::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(visite::class, $id);
    }

    public function edit($id)
    {
        //
    }

    public function update(VisiteRequest $request, $id)
    {
        //
        return RestHelper::update(visite::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(visite::class, $id);
    }
}
