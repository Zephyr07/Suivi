<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class client extends Model
{
    //
    protected $fillable = ['id', 'nom', 'categorie_id'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['categorie'];
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
        return $this->nom;
    }

    public function categorie(){
        return $this->belongsTo(categorie::class);
    }
}
