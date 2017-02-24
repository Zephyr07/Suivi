<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vente extends Model
{
    //
    protected $fillable = ['id', 'date', 'quantite', 'client_id', 'produit_id'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['produit','client'];
}
