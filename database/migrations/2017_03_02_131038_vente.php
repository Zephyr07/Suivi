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
            $table->increments('id');
            $table->double('quantite');
            $table->date('date');
            $table->string('type');
            $table->integer('visite_id')->unsigned();
            $table->integer('produit_id')->unsigned();
            $table->foreign('visite_id')->references('id')->on('visites')->onDelete('cascade');
            $table->foreign('produit_id')->references('id')->on('produits')->onDelete('cascade');
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
