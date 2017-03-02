<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class visite extends Model
{
    //
    protected $fillable = ['id', 'date', 'personne', 'opportunite', 'raison','prospect','proposition','client_id'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['client'];

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

    public  function client(){
        return $this->belongsTo(client::class);
    }

}