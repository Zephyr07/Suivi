<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class produit extends Model
{
    //
    protected $fillable = ['id', 'libelle'];
    protected $dates = ['created_at', 'updated_at'];

    private $foreign = [];
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
        return $this->libelle;
    }
}
