<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vente extends Model
{
    //
    protected $fillable = ['id', 'date', 'quantite', 'client_id', 'produit_id'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['produit','client'];

    private $files = [];

    /**
     * @return array
     */
    public function getForeign()
    {
        return $this->foreign;
    }


    /**
     * @return array
     */
    public function getFiles()
    {
        return $this->files;
    }

    public function getLabel(){
        return $this->id;
    }

    public  function produit(){
        return $this->belongsTo(produit::class);
    }
    public  function client(){
        return $this->belongsTo(client::class);
    }
}
