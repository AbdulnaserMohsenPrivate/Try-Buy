<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGlassesColorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glasses__colors', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('glasses_id');
            $table->unsignedBigInteger('color_id');

            $table->foreign('glasses_id')
      			  ->references('id')->on('glasses')
      			  ->onDelete('cascade');

            $table->foreign('color_id')
                  ->references('id')->on('colors')
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
        Schema::dropIfExists('glasses__colors');
    }
}
