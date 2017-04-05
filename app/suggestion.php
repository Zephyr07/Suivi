<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class suggestion extends Model
{
    //
    protected $fillable = ['id', 'contenu','statut','user_id'];
    protected $dates = ['created_at', 'updated_at'];

    private $foreign = ['user'];
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

    public function user(){
        return $this->belongsTo(user::class);
    }
}
