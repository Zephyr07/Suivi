<?php

namespace App\Http\Controllers;

use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\ProduitRequest;
use App\produit;

class produitController extends Controller
{
    //
    public function index(){
        return RestHelper::get(produit::class);
    }

    public function create()
    {
        //
    }

    public function store(ProduitRequest $request)
    {
        //
        return RestHelper::store(produit::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(produit::class, $id);
    }

    public function edit($id)
    {
        //
    }

    public function update(ProduitRequest $request, $id)
    {
        //
        return RestHelper::update(produit::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(produit::class, $id);
    }
}
