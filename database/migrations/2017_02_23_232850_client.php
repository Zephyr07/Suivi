<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Client extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom')->unique();
            $table->string('email')->unique();
            $table->integer('telephone')->unique();
            $table->string('adresse');
            $table->string('ville');
            $table->integer('boite_postale')->unique();
            $table->integer('categorie_id')->unsigned();
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
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
        Schema::drop('clients');
    }
}
