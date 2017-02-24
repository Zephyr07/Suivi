<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Vente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('ventes', function (Blueprint $table) {
            $table->increments('idvente');
            $table->double('quantite');
            $table->date('date');
            $table->integer('client_idclient')->unsigned();
            $table->integer('produit_idproduit')->unsigned();
            $table->foreign('client_idclient')->references('idclient')->on('clients')->onDelete('cascade');
            $table->foreign('produit_idproduit')->references('idproduit')->on('produits')->onDelete('cascade');
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
        //
        Schema::drop('ventes');
    }
}
