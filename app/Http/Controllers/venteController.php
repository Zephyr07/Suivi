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

    public function most($action,$deb,$fin)
    {
        echo $action;
        echo $deb;
        echo $fin;
        if($action=="plus_grand_consommateur"){
            $users = DB::table('clients')->join('ventes',function($join){
                $join->on('clients.id','=','client_id');
            });
            $te=$users->join('produits',function($join){
                $join->on("produits.id","=","produit_id");
            })
                ->orderBy("quantite",'desc')
                ->whereBetween("date",[$deb,$fin])
                ->limit(3)
                ->get();

            return Response::json($te, 200, [], JSON_NUMERIC_CHECK);
        }
        else if($action=="produit_plus_vendu"){
            $vente=DB::table("ventes")->select("*",DB::raw("SUM(quantite) as quantite"))
                ->groupBy("produit_id")
                ->whereBetween("date",[$deb,$fin])
                ->orderBy("quantite","desc")
                ->limit(3);

            $users = $vente->join("produits",function($join){
                $join->on("produit_id","=","produits.id");
            })->get();

            return Response::json($users, 200, [], JSON_NUMERIC_CHECK);
        }



    }

    public function produit_plus_vendu_demande($type,$deb,$fin)
    {

        $vente=DB::table("ventes")->select("*",DB::raw("SUM(quantite) as quantite"))
            ->groupBy("produit_id")
            ->whereBetween("date",[$deb,$fin])
            ->where("type","=",$type)
            ->orderBy("quantite","desc")
            ->limit(3);

        $users = $vente->join("produits",function($join){
            $join->on("produit_id","=","produits.id");
        })->get();

        return Response::json($users, 200, [], JSON_NUMERIC_CHECK);
    }

    public function somme_vente($user_id,$deb,$fin,$type)
    {
        $vente=DB::table("ventes")
            ->whereBetween("date",[$deb,$fin])
            ->where("user_id","=",$user_id)
            ->where("type","=",$type)
            ->orderBy("date","asc")
            ->join("produits",function($join){
                $join->on("produit_id","=","produits.id");
            })
            ->join("users",function($join){
                $join->on("user_id","=","users.id");
            })
            ->get();

        return Response::json($vente, 200, [], JSON_NUMERIC_CHECK);
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
