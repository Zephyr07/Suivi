<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Profil extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profils', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom')->unique();
            $table->integer('utilisateur'); // gestion des utilisateurs
            $table->integer('categorie'); // gestion des cat�gories
            $table->integer('client'); // gestion des clients
            $table->integer('profil'); // gestion des profils
            $table->integer('produit'); // gestion des produits
            $table->integer('suggestions'); // gestion des suggestions
            $table->integer('rapport'); // gestion des rapports de visite
            $table->integer('bilan_ville'); // consulter bilan de tout le monde dans la m�me ville
            $table->integer('bilan_national'); // consulter bilan de tout le monde peu importe la ville
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('profils');
    }
}
