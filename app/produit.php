<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class produit extends Model
{
    //
    protected $fillable = ['idproduit', 'libelle'];
    protected $dates = ['created_at', 'updated_at'];
}
