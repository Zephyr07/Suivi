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
            $table->string('personne');
            $table->string('raison');
            $table->string('prospect');
            $table->string('opportunite');
            $table->string('proposition');
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
