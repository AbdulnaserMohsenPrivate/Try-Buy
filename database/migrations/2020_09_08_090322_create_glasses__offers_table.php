<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGlassesOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glasses__offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('glasses_id');
            $table->unsignedBigInteger('offer_id');

            $table->foreign('glasses_id')
                  ->references('id')->on('glasses')
                  ->onDelete('cascade');

            $table->foreign('offer_id')
                  ->references('id')->on('offers')
                  ->onDelete('cascade');

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
        Schema::dropIfExists('glasses__offers');
    }
}
