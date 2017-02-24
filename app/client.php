<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class client extends Model
{
    //
    protected $fillable = ['id', 'nom', 'categorie_id'];
    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['categorie'];
}
