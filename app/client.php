<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class client extends Model
{
    //
    protected $fillable = ['idclient', 'nom', 'cateforie_idcategorie'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['categorie'];
}
