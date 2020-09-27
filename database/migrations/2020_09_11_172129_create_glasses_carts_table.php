<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGlassesCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glasses_carts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('glasses_id');
            $table->unsignedBigInteger('cart_id');
            $table->integer('quantity');

            $table->foreign('glasses_id')
                  ->references('id')->on('glasses')
                  ->onDelete('cascade');

            $table->foreign('cart_id')
                  ->references('id')->on('carts')
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
        Schema::dropIfExists('glasses_carts');
    }
}
