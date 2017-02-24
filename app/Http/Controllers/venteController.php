<?php

namespace App\Http\Controllers;

use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\VenteRequest;
use App\vente;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class venteController extends Controller
{
    //
    public function index(){
        return RestHelper::get(vente::class);
    }

    public function create()
    {
        //select nom,quantity,date,libelle from produit,(select nom,quantity,date,produit_idproduit from client ,(select * from consommation order by quantity desc limit 0,2) as q where idclient=client_idclient) v where idproduit=produit_idproduit;
    }

    public function store(VenteRequest $request)
    {
        //
        return RestHelper::store(vente::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(vente::class, $id);
    }

    public function most()
    {
        $users = DB::table('clients')->join('ventes',function($join){
            $join->on('idclient','=','client_idclient');
        });
        $te=$users->join('produits',function($join){
            $join->on("idproduit","=","produit_idproduit");
        })
            ->orderBy("quantite",'desc')
            ->limit(3)
            ->get();


        return Response::json($te, 200, [], JSON_NUMERIC_CHECK);

    }

    public function edit($id)
    {
        //
    }

    public function update(VenteRequest $request, $id)
    {
        //
        return RestHelper::update(vente::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(vente::class, $id);
    }
}
