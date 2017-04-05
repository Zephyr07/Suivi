<?php

namespace App\Http\Controllers;

use App\Helpers\RestHelper;
use App\Http\Requests;
use App\Http\Requests\SuggestionRequest;
use App\suggestion;

class suggestionController extends Controller
{
    //
    public function index(){
        return RestHelper::get(suggestion::class);
    }

    public function create()
    {
        //
    }

    public function store(SuggestionRequest $request)
    {
        //
        return RestHelper::store(suggestion::class, $request->all());
    }

    public function show($id)
    {
        return RestHelper::show(suggestion::class, $id);
    }

    public function edit($id)
    {
        //
    }

    public function update(SuggestionRequest $request, $id)
    {
        //
        return RestHelper::update(suggestion::class, $request->all(), $id);
    }
    public function destroy($id)
    {
        //
        return RestHelper::delete(suggestion::class, $id);
    }
}
