<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class profil extends Model
{
    //
    protected $fillable = ['id','nom' ,'categorie','utilisateur','client','profil','rapport','bilan_ville','bilan_national','produit'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = [];

    public function getForeign()
    {
        return $this->foreign;
    }

    private $files = [];

    /**
     * @return array
     */


    /**
     * @return array
     */
    public function getFiles()
    {
        return $this->files;
    }

    public function getLabel(){
        return $this->nom;
    }
}
