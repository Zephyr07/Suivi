<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class produit extends Model
{
    //
    protected $fillable = ['id', 'libelle'];
    protected $dates = ['created_at', 'updated_at'];
}
