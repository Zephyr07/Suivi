<?php

namespace App\Http\Controllers;

use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\ProfilRequest;
use App\profil;

class profilController extends Controller
{
    //
    public function index(){
        return RestHelper::get(profil::class);
    }

    public function create()
    {
        //
    }

    public function store(ProfilRequest $request)
    {
        //
        return RestHelper::store(profil::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(profil::class, $id);
    }

    public function edit($id)
    {
        //
    }

    public function update(ProfilRequest $request, $id)
    {
        //
        return RestHelper::update(profil::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(profil::class, $id);
    }
}
