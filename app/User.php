<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','nom','ville', 'email', 'password','profil_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['profil'];
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
        return $this->name;
    }

    public  function profil(){
        return $this->belongsTo(profil::class);
    }
}
