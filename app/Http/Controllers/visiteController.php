<?php

namespace App\Http\Controllers;

use App\visite;
use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\VisiteRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

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

    public function meilleur_client($deb,$fin)
    {

        $visite=DB::table("visites")->select("*",DB::raw("SUM(somme) as somme"))
            ->groupBy("client_id")
            ->whereBetween("date",[$deb,$fin])
            ->orderBy("somme","desc")
            ->limit(3)
            ->join("clients",function($join){
                $join->on("client_id","=","clients.id");
            })
            ->get();

        return Response::json($visite, 200, [], JSON_NUMERIC_CHECK);
    }

    public function visite($deb,$fin)
    {
        $visite=DB::table("visites")->select("*",DB::raw("visites.id as id_visite"))
            ->whereBetween("date",[$deb,$fin])
            ->join("clients",function($join){
                $join->on("client_id","=","clients.id");
            })
            ->get();

        return Response::json($visite, 200, [], JSON_NUMERIC_CHECK);
    }
}
