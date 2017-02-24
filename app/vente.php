<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vente extends Model
{
    //
    protected $fillable = ['idvente', 'date', 'quantite', 'client_idclient', 'produit_idproduit'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['produit','client'];
}
