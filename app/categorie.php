<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class categorie extends Model
{
    //
    protected $fillable = ['id', 'intitule'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = [];

    public function getForeign()
    {
        return $this->foreign;
    }
}
